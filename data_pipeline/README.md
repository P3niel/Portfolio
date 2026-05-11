# Data Pipeline

Pipeline de demonstration pour ingestion et nettoyage du dataset Iris.

## Execution

```bash
cd data_pipeline
python3 pipeline.py
```

Le script cree deux fichiers dans `data_pipeline/output/`:

- `iris_raw.csv`
- `iris_cleaned.csv`

## Variables d'environnement

- `PIPELINE_OUTPUT_DIR` - defaut `data_pipeline/output`
