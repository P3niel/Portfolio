#!/usr/bin/env bash
set -euo pipefail

if [[ $# -eq 0 ]]; then
  echo "usage: retry.sh <command> [args...]" >&2
  exit 1
fi

attempts="${RETRY_ATTEMPTS:-4}"
sleep_seconds="${RETRY_SLEEP_SECONDS:-10}"

if ! [[ "$attempts" =~ ^[0-9]+$ ]] || ! [[ "$sleep_seconds" =~ ^[0-9]+$ ]]; then
  echo "RETRY_ATTEMPTS and RETRY_SLEEP_SECONDS must be integers" >&2
  exit 1
fi

status=0
for attempt in $(seq 1 "$attempts"); do
  if "$@"; then
    exit 0
  else
    status=$?
  fi

  if [[ "$attempt" -eq "$attempts" ]]; then
    break
  fi

  echo "Attempt $attempt/$attempts failed with exit code $status; retrying in ${sleep_seconds}s..." >&2
  sleep "$sleep_seconds"
done

exit "$status"
