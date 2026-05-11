# Training

Scripts d'entrainement et de promotion du modele Iris.

## Entrainement

```bash
cd training
python3 train.py
```

Le script:

- entraine un `RandomForestClassifier` sur Iris
- logue params et metric `accuracy` dans MLflow
- enregistre le modele sous `portfolio-model`
- positionne la nouvelle version en `Staging`

## Promotion

```bash
cd training
python3 promote.py
```

Le script compare l'accuracy de la derniere version `Staging` a celle de `Production`.

## Variables d'environnement

- `MLFLOW_TRACKING_URI` - defaut `http://localhost:5000`
- `MODEL_NAME` - defaut `portfolio-model`
