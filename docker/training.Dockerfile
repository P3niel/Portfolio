FROM python:3.11-slim AS builder

WORKDIR /build
COPY training/requirements.txt .
RUN pip install --no-cache-dir --upgrade pip \
 && pip install --no-cache-dir -r requirements.txt --target /install

# ── Runtime ───────────────────────────────────────────────────────────────────
FROM python:3.11-slim

RUN useradd -m -u 1001 appuser

WORKDIR /app
COPY --from=builder /install /usr/local/lib/python3.11/site-packages
COPY training/ .

USER appuser

ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1

CMD ["python", "train.py"]
