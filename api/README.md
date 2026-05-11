# API

Service FastAPI pour le portfolio DevOps/MLOps.

## Demarrage local

Depuis la racine du repo:

```bash
make api-dev
```

Par defaut, le serveur ecoute sur `http://localhost:8000`.

## Variables d'environnement

- `MLFLOW_TRACKING_URI` - defaut `http://localhost:5000`
- `ALLOWED_ORIGINS` - defaut `http://localhost:3000`
- `MODEL_NAME` - defaut `portfolio-model`
- `PORT` - defaut `8000`

## Comportement du chargement modele

- L'API essaie d'abord de charger le modele depuis MLflow.
- Si MLflow n'est pas disponible, elle entraine un modele Iris local en fallback.
- Le endpoint `/health` expose la version actuellement chargee.

## Tests

Depuis `api/`:

```bash
python3 -m pytest tests -v
```
