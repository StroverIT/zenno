#!/usr/bin/env bash
# Apply Prisma migrations to the production database configured in .env.production
# (Supabase Postgres). Uses DIRECT_URL when set so migrations are not run through PgBouncer.
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

ENV_FILE="${ENV_FILE:-$ROOT/.env.production}"
if [[ ! -f "$ENV_FILE" ]]; then
  echo "error: missing $ENV_FILE" >&2
  exit 1
fi

set -a
# shellcheck disable=SC1090
source "$ENV_FILE"
set +a

if [[ -n "${DIRECT_URL:-}" ]]; then
  export DATABASE_URL="$DIRECT_URL"
fi

if [[ -z "${DATABASE_URL:-}" ]]; then
  echo "error: DATABASE_URL (or DIRECT_URL) must be set in $ENV_FILE" >&2
  exit 1
fi

echo "Running: prisma migrate deploy"
npx prisma migrate deploy
