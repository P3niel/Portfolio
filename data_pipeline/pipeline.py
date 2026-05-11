from __future__ import annotations

import os
from pathlib import Path

import pandas as pd
from sklearn.datasets import load_iris


def build_raw_dataframe() -> pd.DataFrame:
    dataset = load_iris(as_frame=True)
    frame = dataset.frame.copy()
    frame["species"] = frame["target"].map(dict(enumerate(dataset.target_names)))
    return frame


def build_clean_dataframe(raw_frame: pd.DataFrame) -> pd.DataFrame:
    cleaned = raw_frame.rename(
        columns={
            "sepal length (cm)": "sepal_length",
            "sepal width (cm)": "sepal_width",
            "petal length (cm)": "petal_length",
            "petal width (cm)": "petal_width",
        }
    ).copy()

    cleaned = cleaned.drop(columns=["target"])
    cleaned["species"] = cleaned["species"].astype(str).str.strip().str.lower()
    cleaned = cleaned.drop_duplicates().reset_index(drop=True)

    ordered_columns = [
        "sepal_length",
        "sepal_width",
        "petal_length",
        "petal_width",
        "species",
    ]
    return cleaned.loc[:, ordered_columns]


def main() -> None:
    base_dir = Path(__file__).resolve().parent
    output_dir = Path(
        os.getenv("PIPELINE_OUTPUT_DIR", str(base_dir / "output"))
    ).resolve()
    output_dir.mkdir(parents=True, exist_ok=True)

    raw_frame = build_raw_dataframe()
    clean_frame = build_clean_dataframe(raw_frame)

    raw_path = output_dir / "iris_raw.csv"
    cleaned_path = output_dir / "iris_cleaned.csv"

    raw_frame.to_csv(raw_path, index=False)
    clean_frame.to_csv(cleaned_path, index=False)

    print(f"Raw dataset written to: {raw_path}")
    print(f"Clean dataset written to: {cleaned_path}")
    print(f"Rows: raw={len(raw_frame)} cleaned={len(clean_frame)}")


if __name__ == "__main__":
    main()
