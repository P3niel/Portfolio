# Disabled backend workflows

`cd.yml` is intentionally stored outside `.github/workflows/` so GitHub does
not build or deploy the Portfolio backend while the k3s infrastructure is
offline to control costs.

The Dockerfiles, Kubernetes manifests, and deployment steps remain versioned
as Infrastructure as Code evidence.

To reactivate the backend delivery path:

1. Restore k3s, MLflow, and the required monitoring services.
2. Verify the `KUBECONFIG` and runtime URL secrets in GitHub.
3. Move `cd.yml` back to `.github/workflows/cd.yml`.
4. Run CI on a test branch, then merge only after the cluster readiness check
   succeeds.
5. Trigger model promotion manually before considering a schedule.
