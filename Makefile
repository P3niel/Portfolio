# ── Variables ──────────────────────────────────────────────────────────────────
APP_DIR       := frontend
K8S_OVERLAY   := k8s/overlays/production
REGISTRY      := ghcr.io
IMAGE_OWNER   ?= p3niel
SERVER_PORT   := 8765
PID_FILE      := .server.pid
LOG_FILE      := .server.log

.PHONY: dev build lint typecheck frontend-install \
        k8s-apply k8s-status k8s-logs-api k8s-restart-api \
        k8s-port-forward-grafana k8s-port-forward-mlflow k8s-init \
        docker-build-api docker-build-pipeline docker-build-training docker-push \
        api-dev train pipeline-run \
        ci serve stop restart status urls

# ── Frontend ───────────────────────────────────────────────────────────────────
dev:
	cd $(APP_DIR) && npm run dev

build:
	cd $(APP_DIR) && npm run build

lint:
	cd $(APP_DIR) && npm run lint

typecheck:
	cd $(APP_DIR) && npx tsc --noEmit

frontend-install:
	cd $(APP_DIR) && npm install

# ── Kubernetes ─────────────────────────────────────────────────────────────────
k8s-apply:
	kubectl apply -k $(K8S_OVERLAY)

k8s-status:
	kubectl get pods -n portfolio

k8s-logs-api:
	kubectl logs -n portfolio -l app=api --tail=100 -f

k8s-restart-api:
	kubectl rollout restart deployment/api -n portfolio

k8s-port-forward-grafana:
	kubectl port-forward -n portfolio svc/grafana 3001:3000

k8s-port-forward-mlflow:
	kubectl port-forward -n portfolio svc/mlflow 5001:5000

k8s-init:
	kubectl apply -f k8s/base/namespace.yaml
	kubectl apply -k k8s/base/

# ── Docker ─────────────────────────────────────────────────────────────────────
docker-build-api:
	docker build -f docker/api.Dockerfile -t $(REGISTRY)/$(IMAGE_OWNER)/portfolio-api:local .

docker-build-pipeline:
	docker build -f docker/pipeline.Dockerfile -t $(REGISTRY)/$(IMAGE_OWNER)/portfolio-pipeline:local .

docker-build-training:
	docker build -f docker/training.Dockerfile -t $(REGISTRY)/$(IMAGE_OWNER)/portfolio-training:local .

docker-push:
	docker push $(REGISTRY)/$(IMAGE_OWNER)/portfolio-api:local
	docker push $(REGISTRY)/$(IMAGE_OWNER)/portfolio-pipeline:local

# ── Python (délégué à Codex) ───────────────────────────────────────────────────
api-dev:
	cd api && uvicorn app.main:app --reload --port 8000

train:
	cd training && python train.py

pipeline-run:
	cd data_pipeline && python pipeline.py

# ── CI locale ─────────────────────────────────────────────────────────────────
ci: lint typecheck
	@if [ -f api/requirements.txt ]; then \
	  cd api && pip install -r requirements.txt -q && pytest tests/ -v; \
	else \
	  echo "api/ not yet initialised by Codex — skipping pytest"; \
	fi

# ── Serveur mockups statiques (port $(SERVER_PORT)) ───────────────────────────
serve:
	@if [ -f "$(PID_FILE)" ] && kill -0 "$$(cat "$(PID_FILE)")" 2>/dev/null; then \
	  echo "Server already running (PID $$(cat "$(PID_FILE)"))"; \
	else \
	  nohup python3 -m http.server $(SERVER_PORT) --directory mockups \
	    >"$(LOG_FILE)" 2>&1 & echo $$! >"$(PID_FILE)"; \
	  echo "Started on http://localhost:$(SERVER_PORT)"; \
	fi

stop:
	@if [ -f "$(PID_FILE)" ] && kill -0 "$$(cat "$(PID_FILE)")" 2>/dev/null; then \
	  kill "$$(cat "$(PID_FILE)")" && rm -f "$(PID_FILE)"; \
	  echo "Server stopped"; \
	else \
	  rm -f "$(PID_FILE)"; \
	  echo "No running server found"; \
	fi

restart: stop serve

status:
	@if [ -f "$(PID_FILE)" ] && kill -0 "$$(cat "$(PID_FILE)")" 2>/dev/null; then \
	  echo "Running (PID $$(cat "$(PID_FILE)"))"; \
	else \
	  echo "Stopped"; \
	fi

urls:
	@echo "http://localhost:$(SERVER_PORT)/classic.html"
	@echo "http://localhost:$(SERVER_PORT)/split.html"
