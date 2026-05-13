#!/usr/bin/env bash
set -euo pipefail

content="${KUBECONFIG_CONTENT:-}"
config_path="${KUBECONFIG_PATH:-$HOME/.kube/config}"

if [[ -z "$content" ]]; then
  echo "KUBECONFIG_CONTENT is empty" >&2
  exit 1
fi

mkdir -p "$(dirname "$config_path")"

tmp_config="$(mktemp)"
trap 'rm -f "$tmp_config"' EXIT

if printf '%s' "$content" | base64 -d >"$tmp_config" 2>/dev/null && grep -q '^apiVersion:' "$tmp_config"; then
  :
else
  printf '%s\n' "$content" >"$tmp_config"
fi

if ! grep -q '^apiVersion:' "$tmp_config"; then
  echo "KUBECONFIG_CONTENT is neither a kubeconfig nor a base64-encoded kubeconfig" >&2
  exit 1
fi

cp "$tmp_config" "$config_path"
chmod 600 "$config_path"
