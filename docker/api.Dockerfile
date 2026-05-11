FROM python:3.11-slim AS builder

WORKDIR /build
COPY api/requirements.txt .
RUN pip install --no-cache-dir --upgrade pip \
 && pip install --no-cache-dir -r requirements.txt --target /install

# ── Runtime ───────────────────────────────────────────────────────────────────
FROM python:3.11-slim

RUN useradd -m -u 1001 appuser

WORKDIR /app
COPY --from=builder /install /usr/local/lib/python3.11/site-packages
COPY api/ .

USER appuser

EXPOSE 8000
ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PORT=8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
