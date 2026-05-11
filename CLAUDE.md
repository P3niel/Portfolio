# Portfolio — DevOps/MLOps Platform

> Convention versionnee du repo: consulter `CONVENTIONS_DEVOPS_MLOPS.md`.
> Si presents localement: consulter aussi `MEMOIRE_COLLECTIVE.md` et `SUMMARY_SESSION.md` pour le contexte de travail et les passations.

Next.js 15 + React 19 portfolio déployé sur Vercel, avec une plateforme MLOps (FastAPI + MLflow + k3s) déployée sur VPS.

## Structure

```
Portfolio/
├── frontend/           ← Next.js app (Claude Code)
│   ├── app/            ← Routes App Router
│   ├── components/     ← Composants UI (cv/, projects/, lab/)
│   ├── lib/            ← config.ts — source unique CV + projets
│   └── public/         ← Fichiers statiques (cv.pdf)
├── api/                ← FastAPI ML service (Codex)
├── training/           ← Pipeline d'entraînement Python (Codex)
├── data_pipeline/      ← Script CronJob Python (Codex)
├── k8s/
│   ├── base/           ← Manifests Kubernetes (Kustomize)
│   └── overlays/production/
├── docker/             ← Dockerfiles par service
├── monitoring/         ← Prometheus, Grafana, Loki configs
├── .github/workflows/  ← CI/CD GitHub Actions
└── Makefile            ← Toutes les commandes
```

## Stack

| Couche      | Tech                                          | Propriétaire |
|-------------|-----------------------------------------------|--------------|
| Frontend    | Next.js 15, React 19, Tailwind CSS 3          | Claude Code  |
| API         | FastAPI, Python 3.11, Uvicorn                 | Codex        |
| ML          | scikit-learn, MLflow                          | Codex        |
| Infra       | k3s, Kustomize, Traefik, cert-manager         | Claude Code  |
| Monitoring  | Prometheus, Grafana, Loki                     | Claude Code  |
| CI/CD       | GitHub Actions, GHCR                         | Claude Code  |
| VPS         | Hetzner CX22, Ubuntu 22.04                    | Manuel       |

## Commandes

```bash
# Développement frontend (port 3000)
make dev
make build
make lint
make typecheck
make frontend-install

# Kubernetes
make k8s-apply               # apply -k overlays/production
make k8s-status              # kubectl get pods -n portfolio
make k8s-logs-api            # logs API en direct
make k8s-restart-api
make k8s-port-forward-grafana  # → localhost:3001
make k8s-port-forward-mlflow   # → localhost:5001

# Docker
make docker-build-api
make docker-build-pipeline
make docker-push IMAGE_OWNER=<owner>

# Python (délégué à Codex, utilisés localement)
make api-dev                 # uvicorn --reload :8000
make train
make pipeline-run

# CI locale
make ci                      # lint + typecheck + pytest

# Mockups statiques (port 8765)
make serve / stop / restart / status
```

## Conventions Frontend (`frontend/`)

- **App Router uniquement** — pas de `pages/`, pas de `src/`
- **Tailwind uniquement** — pas de CSS modules, pas de styled-components, pas de CSS-in-JS
- **TypeScript strict** — pas de `any` sans commentaire justificatif
- **Alias `@/*`** → `frontend/*`
- **Contenu config-driven** — toutes les données CV et projets dans `frontend/lib/config.ts`
- **Three.js interdit** — design flat terminal pur (supprimé définitivement)

## Conventions Kubernetes (`k8s/`)

- Pattern Kustomize `base/` + `overlays/production/`
- Namespace unique : `portfolio`
- Images : `ghcr.io/<owner>/portfolio-*`, tags SHA en production
- Secrets gérés hors-dépôt : `kubectl create secret` — ne jamais commiter

## Frontières des tâches

### Claude Code modifie
- `frontend/` (pages, composants, styles, lib/config.ts)
- `k8s/` (tous les manifests)
- `docker/` (Dockerfiles)
- `monitoring/` (toutes les configs YAML)
- `.github/workflows/` (CI/CD)
- `Makefile`, `CLAUDE.md`, `README.md`

### Codex modifie
- `api/` (code FastAPI, modèle, routes, tests)
- `training/` (pipeline, promote.py)
- `data_pipeline/` (script CronJob)
- `api/requirements.txt`, `training/requirements.txt`

**Claude Code ne modifie PAS le code Python applicatif dans `api/`, `training/`, `data_pipeline/`.**

## Contrat d'interface (Claude ↔ Codex)

Voir `api/SPEC.md` pour le détail complet des endpoints.

```
GET  /health   → { status, model_version, uptime_seconds }
GET  /metrics  → Prometheus text format
POST /predict  → { features: {...} } → { prediction, confidence, model_version }
```

## Variables d'environnement

| Variable | Usage | Où configurer |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | URL de l'API FastAPI | Vercel project settings |
| `MLFLOW_TRACKING_URI` | URL MLflow | GitHub secret + k8s secret |
| `KUBECONFIG` | Accès cluster k3s | GitHub secret |

## Contraintes clés

- Ne pas lancer `npm install <pkg>` sans confirmer l'impact version
- `.server.log` et `.server.pid` sont des fichiers runtime — ne jamais commiter
- Les secrets k8s sont créés manuellement hors-dépôt
- `NEXT_PUBLIC_API_URL` doit être configuré dans Vercel pour que `/lab` fonctionne

## Do NOT

- Modifier `api/`, `training/`, `data_pipeline/` (domaine Codex)
- Réintroduire Three.js ou des dépendances 3D
- Créer un répertoire `src/` — le projet utilise `app/` et `components/` à la racine de `frontend/`
- Toucher `package-lock.json` manuellement
