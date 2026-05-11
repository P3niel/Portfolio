# Conventions DevOps MLOps

Convention versionnee du repo pour garder une ligne claire entre produit, infra, backend ML et exploitation.

## Objectif

- Construire un portfolio avec un frontend public et une plateforme MLOps observable, reproductible et deployable.
- Garder une separation nette entre presentation, service ML, pipeline d'entrainement, pipeline de donnees et infrastructure.

## Principes directeurs

- Reproductibilite d'abord: une action importante doit etre rejouable par code ou par commande documentee.
- Contrats explicites: toute interface entre services doit etre decrite avant d'etre consommee.
- Observabilite par defaut: sante, latence, erreurs et version du modele doivent etre visibles.
- Secrets hors depot: aucun secret ni credential ne doit etre commit.
- Artifacts immuables: les builds et images doivent etre identifiables par version ou SHA.
- Changements increments: chaque modification doit laisser un etat testable et comprehensible.

## Structure de reference

- `frontend/`: interface Next.js et proxies UI vers les services.
- `api/`: service FastAPI et inference.
- `training/`: entrainement, evaluation, promotion de modele.
- `data_pipeline/`: ingestion / transformation / taches planifiees.
- `k8s/`: manifests Kustomize `base/` et `overlays/`.
- `docker/`: Dockerfiles par composant.
- `monitoring/`: Prometheus, Grafana, Loki et ressources associees.
- `Makefile`: point d'entree des commandes locales recurrentes.
- `api/SPEC.md`: source de verite du contrat frontend/backend.

## Conventions de developpement

- Passer par `Makefile` quand une commande existe deja.
- Documenter toute nouvelle variable d'environnement dans le repo.
- Ajouter ou mettre a jour les tests quand le comportement change.
- Eviter les changements transverses silencieux: si un contrat bouge, mettre a jour les consumers dans la meme passe.
- Garder les docs racine synchronisees avec l'etat reel du projet.

## Conventions backend et MLOps

- `api/` doit exposer au minimum `GET /health`, `GET /metrics` et `POST /predict` conformement a `api/SPEC.md`.
- Les schemas d'entree/sortie doivent etre valides explicitement et retourner des erreurs lisibles.
- Toute version de modele servant en inference doit etre tracable via MLflow ou un mecanisme equivalent.
- Les scripts `training/` et `data_pipeline/` doivent privilegier des entrees deterministes et des sorties documentees.
- Les dependances Python doivent etre explicites et versionnees par fichier de requirements.
- Les promotions de modele doivent etre basees sur des criteres mesurables, pas sur une decision implicite.

## Conventions infra et release

- Kubernetes suit le pattern `base/` + `overlays/<env>`.
- Le namespace de reference est `portfolio`.
- Les images suivent le prefixe `ghcr.io/<owner>/portfolio-*`.
- La production doit privilegier des tags de commit ou SHA, pas uniquement `latest`.
- Toute config runtime sensible passe par secret ou variable d'environnement, jamais en dur dans le repo.
- Un changement infra doit idealement etre observable par diff Git et reproductible sans action manuelle cachee.

## Conventions d'observabilite

- Exposer des signaux utiles des le debut: healthcheck, latence, taux d'erreur, version du modele, evenements de service.
- Les dashboards doivent raconter l'etat du systeme, pas seulement afficher des courbes brutes.
- En cas de panne, un chemin de diagnostic simple doit exister depuis le frontend ou les commandes `make`.

## Conventions de collaboration

- `frontend/`, `k8s/`, `docker/`, `monitoring/` et `.github/workflows/` sont principalement cote Claude.
- `api/`, `training/` et `data_pipeline/` sont principalement cote Codex.
- `Makefile`, `api/SPEC.md` et les docs racine sont des zones partagees: noter l'impact quand elles changent.
- `MEMOIRE_COLLECTIVE.md` et `SUMMARY_SESSION.md` peuvent servir de support local de passation, mais ne font pas partie de la source de verite versionnee.

## Definition of done minimale

- Le code ou la config fonctionne dans le perimetre modifie.
- Les impacts ops, contrats et variables d'environnement sont documentes.
- Les tests ou verifications adaptes ont ete lances, ou l'absence de verification est explicite.
- Le changement laisse un prochain pas clair pour la suite.
