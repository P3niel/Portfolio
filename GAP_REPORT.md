# Portfolio Gap Report

Audit date: 2026-07-02
Branch audited: `codex/portfolio-refresh`

## Executive Summary

Le portfolio est visuellement fort, mais il melange trois niveaux de realite sans les distinguer assez clairement:

- **Reel dans ce repo**: Next.js portfolio, API FastAPI, modele Iris RandomForest, MLflow-compatible training/promote scripts, manifests k8s, Prometheus/Grafana/Loki manifests.
- **Live-ready mais pas prouve live**: `/lab` et ses proxies peuvent interroger une API/MLflow/Loki, mais retombent automatiquement en donnees demo.
- **Case studies / concepts non prouves localement**: Toxic AI, Fraud Detection, Air Quality Edge, certaines metriques, certains repos GitHub, plusieurs stacks affichees.

Le principal risque est la promesse "Not demos" / "LIVE" alors que plusieurs surfaces affichent des donnees statiques ou demo. Le correctif le plus important est d'introduire un statut explicite par projet/signal: `live`, `implemented`, `case-study`, `planned`, ou `demo`.

## P0 - A Corriger Avant Un Portfolio Public

| Zone | Gap | Evidence locale | Correction recommandee |
|---|---|---|---|
| CV formation | Institutions placeholder visibles. | `frontend/lib/config.ts:110-120` contient `Universite (placeholder)`. | Remplacer par les vrais etablissements ou retirer la section formation. |
| Hero claim | "Not notebooks. Not demos." et "Real pipelines..." surpromettent si le lab/projets affichent du demo. | `frontend/app/page.tsx:621-628`. | Soit prouver le live, soit reformuler: "Production-shaped systems and live-ready demos..." |
| Hero spec card | Stack affiche `GO` et `TF`, mais le repo ne contient pas de Go ni Terraform. | `frontend/app/page.tsx:654`; recherche locale sans `.go`/`.tf`. | Remplacer par la stack verifiee: `K8S · PY · TS · FASTAPI` ou ajouter preuves Go/Terraform. |
| System Status | Les chiffres sont hardcodes et le bloc annonce `LIVE`. | `frontend/app/page.tsx:856-884`: `17.2M`, `74 MS`, `99.88%`, `03 / 06`, `08`, `ALL SYSTEMS OPERATIONAL`. | Brancher aux proxies `/lab`, ou renommer en `SAMPLE OPERATING SIGNALS` et retirer `LIVE`. |
| Project thumbnails | Metriques fictives ou non prouvees: toxic score/latency, fraud `4.2M`, air-quality `42`, devops lab `v0.4`. | `frontend/app/page.tsx:681-707`, `734`, `759`. | Remplacer par "sample trace", "architecture sketch", ou de vraies metriques versionnees. |
| Terminal project data | Donnees de terminal type Docker/env/git commits semblent fictives pour toxic/fraud/air-quality. | `frontend/app/page.tsx:14-43`. | Supprimer si non utilise, ou afficher uniquement avec label `mock terminal output`. |
| Lab fallback | Le lab peut afficher des donnees demo quand les services sont absents. | `frontend/app/api/*`: `demoHealth`, `demoMetrics`, `demoPrediction`, `demoMlflow`, `fallbackEvents`. | Garder le mode demo mais l'afficher en grand: "Demo fallback, upstream unavailable". |
| Source repos | Liens vers repos projet potentiellement non alignes avec ce repo. | `frontend/lib/config.ts:136`, `170`, `203`, `235`. | Verifier que chaque repo existe et contient le projet decrit, sinon retirer le lien ou pointer vers ce mono-repo. |
| CV PDF | Bouton "Telecharger PDF" pointe vers `/cv.pdf`, mais aucun `cv.pdf` n'est versionne. | `frontend/components/cv/CvHeader.tsx:68-74`; aucun fichier public trouve. | Ajouter `frontend/public/cv.pdf` ou retirer le bouton. |

## P1 - Claims A Qualifier Ou A Prouver

| Zone | Gap | Evidence locale | Correction recommandee |
|---|---|---|---|
| Project taxonomy | Les pages projets presentent tout comme "Production-shaped case studies", mais certains projets semblent conceptuels. | `frontend/lib/config.ts:164-260`; `frontend/app/projects/page.tsx:23-27`. | Ajouter `status` sur chaque projet: `implemented`, `case study`, `planned`, `external`. Afficher ce badge. |
| Toxic AI | Claims PyTorch/Jigsaw/TorchServe/GPU non prouves dans les sources locales. | `frontend/lib/config.ts:165-195`; `frontend/app/page.tsx:14-23`. | Soit lier un repo reel, soit reformuler en "NLP serving case study". |
| Fraud Detection | Kafka/Spark/XGBoost/Airflow/Terraform non presents dans le repo. | `frontend/lib/config.ts:198-227`; `frontend/app/page.tsx:24-33`. | Marquer comme architecture study ou ajouter code/docs preuves. |
| Air Quality Edge | MQTT/InfluxDB/LSTM/TensorFlow/Helm/ARM64 non presents dans le repo. | `frontend/lib/config.ts:230-259`; `frontend/app/page.tsx:34-43`. | Marquer comme concept/case study ou ajouter repo/preuve. |
| Skills homepage | Affiche Terraform, Helm, Kubeflow, BentoML, Go, OpenTelemetry, ArgoCD, Tekton. Plusieurs ne sont pas implementes ici. | `frontend/app/page.tsx:781-788`. | Aligner sur competences reelles ou distinguer "used professionally" vs "implemented in this portfolio". |
| CV skills | `Terraform`, `Traefik` dans le CV, mais pas de Terraform local; Traefik apparait seulement dans docs/ingress assumptions. | `frontend/lib/config.ts:87-108`; `CLAUDE.md:36`. | Garder si vrai experience perso, mais ne pas laisser penser que ce repo le prouve. |
| Experience "production" | "production environments" et "system work" peuvent etre vrais, mais besoin de preuves ou formulation plus precise. | `frontend/app/page.tsx:627-628`, `648-659`. | Ajouter contexte: "personal k3s lab", "VPS deployment", ou "professional experience". |
| MLOps Platform | Le repo prouve Iris + FastAPI + MLflow-ready + k8s manifests; pas de preuve directe de Hetzner live, domaine, CI green, Grafana public. | `frontend/lib/config.ts:126-163`; `k8s/overlays/production/kustomization.yaml:127-143`. | Ajouter liens de preuve: PRs, dashboards captures, deploy URL, ou baisser la promesse. |
| Contact SLA | `RESP. < 48H` et `OPEN TO WORK` sont des etats personnels volatiles. | `frontend/app/page.tsx:889-907`. | Confirmer que c'est vrai aujourd'hui; sinon rendre plus neutre. |

## P2 - Incoherences Et Nettoyage

| Zone | Gap | Evidence locale | Correction recommandee |
|---|---|---|---|
| SUMMARY.md obsolete | Decrit Three.js, GalaxyScene, terminal-portfolio, page vide; contraire au frontend actuel et a `CLAUDE.md`. | `SUMMARY.md:1-70`; `CLAUDE.md:83`, `135-139`. | Recrire ou archiver `SUMMARY.md` comme historique. |
| architecture.md incomplet | Le diagramme liste health/metrics/mlflow/lab-events mais pas `predict-proxy`. | `architecture.md:36-49`; `frontend/app/api/predict-proxy/route.ts`. | Ajouter `/api/predict-proxy` dans le diagramme. |
| Memoire obsolete | Dit que backend Python est "squelettes", alors qu'il existe maintenant API/training/data_pipeline. | `MEMOIRE_COLLECTIVE.md:168`, `212-218`. | Mettre a jour ou laisser explicitement comme historique date. |
| Ingress domains | `DOMAIN_PLACEHOLDER` existe dans l'ingress base, et l'overlay production laisse l'ingress commente. | `k8s/base/ingress/ingress.yaml`; `k8s/overlays/production/kustomization.yaml:140-143`. | Tant que pas de domaine, ne pas promettre public API/Grafana/MLflow. |
| Image tags | Production overlay utilise `latest`, alors que docs disent tags SHA en production. | `k8s/overlays/production/kustomization.yaml:127-138`; `CLAUDE.md:87-90`. | Remplacer par tag SHA via CI ou corriger la doc. |
| Lab config localhost | Valeurs par defaut pointent localhost. Correct en dev, mais a configurer en prod. | `frontend/lib/config.ts:297-302`; `frontend/next.config.ts:6`. | Documenter les variables Vercel obligatoires et verifier qu'elles sont posees. |
| Contact form | Le formulaire n'envoie rien serveur; il ouvre un `mailto:`. | `frontend/app/page.tsx:328-342`, `900-902`. | Assumer `mailto` dans le texte ou ajouter une route/contact provider. |

## Realite Technique Actuelle A Mettre En Avant

Ce qui est defendable sans surpromesse:

- Frontend Next.js 15 / React 19 / Tailwind avec pages `/`, `/cv`, `/projects`, `/projects/[slug]`, `/lab`.
- Source de contenu centralisee dans `frontend/lib/config.ts`.
- API FastAPI avec `/health`, `/metrics`, `/predict`.
- Modele actuel: Iris RandomForest avec fallback local et chargement MLflow si disponible.
- Training MLflow: entrainement Iris, registration `portfolio-model`, transition `Staging`.
- Promotion MLflow: comparaison `Staging` vs `Production` par accuracy.
- Data pipeline: ingestion/nettoyage Iris.
- Manifests k8s pour API, MLflow, Prometheus, Grafana, Loki, CronJob.
- Lab frontend "live-ready" avec badges `live/demo` et proxies Next.js.

## Plan De Remediation Recommande

1. Ajouter un champ `status` aux projets dans `frontend/lib/config.ts`:
   - `live`
   - `implemented-in-this-repo`
   - `external-repo`
   - `architecture-case-study`
   - `planned`

2. Remplacer le bloc `SYSTEM STATUS` de la homepage par des donnees reelles:
   - soit consommer les memes endpoints que `/lab`;
   - soit renommer le bloc en `SAMPLE SIGNALS` et supprimer `LIVE`.

3. Separer les projets en deux groupes:
   - "Built / running": MLOps Platform, DevOps Lab, Iris API.
   - "Architecture case studies": Toxic AI, Fraud Detection, Air Quality Edge, tant que les preuves ne sont pas publiees.

4. Faire une passe CV:
   - remplacer les institutions placeholder;
   - confirmer `6+ years`;
   - ajouter ou retirer `cv.pdf`;
   - aligner skills avec preuves ou experience reelle.

5. Faire une passe docs:
   - recrire `SUMMARY.md`;
   - mettre a jour `architecture.md`;
   - mettre a jour `MEMOIRE_COLLECTIVE.md` ou le marquer comme historique.

6. Faire une passe infra/live:
   - verifier les variables Vercel: `NEXT_PUBLIC_API_URL`, `NEXT_PUBLIC_MLFLOW_URL`, `NEXT_PUBLIC_GRAFANA_URL`, `NEXT_PUBLIC_LOKI_URL` si exposees;
   - remplacer `DOMAIN_PLACEHOLDER`;
   - remplacer `latest` par tag SHA si production reelle.

## Definition Of Done Pour "Correspond A La Realite"

Le portfolio peut etre considere aligne quand:

- Aucune page publique ne contient `placeholder`, `DOMAIN_PLACEHOLDER`, ou une metrique fictive presentee comme live.
- Chaque projet affiche clairement son statut reel.
- Les liens GitHub pointent vers des repos existants qui prouvent les claims.
- Le lab affiche "live" seulement quand tous les upstreams repondent vraiment.
- Le CV ne contient plus d'institution placeholder ni de lien PDF absent.
- Les docs racine ne contredisent plus le frontend actuel.
