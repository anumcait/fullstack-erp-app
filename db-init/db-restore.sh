#!/usr/bin/env bash
set -euo pipefail

echo "🟡  db-restore.sh running …"

# Wait until DB accepts connections
until pg_isready -U "$POSTGRES_USER" -d "$POSTGRES_DB" >/dev/null 2>&1 ; do
  echo "Waiting for $POSTGRES_DB to be ready…"
  sleep 1
done

# Drop and recreate target database (connect to postgres, not the one we're dropping)
echo "🔄  Dropping and recreating $POSTGRES_DB …"
psql -U "$POSTGRES_USER" -d postgres -c "DROP DATABASE IF EXISTS \"$POSTGRES_DB\";"
psql -U "$POSTGRES_USER" -d postgres -c "CREATE DATABASE \"$POSTGRES_DB\";"

# Restore from backup
echo "📦  Restoring $POSTGRES_DB from /pg_restore/hrdb.backup …"
pg_restore --no-owner --clean --if-exists \
           -U "$POSTGRES_USER" -d "$POSTGRES_DB" /pg_restore/hrdb.backup

echo "✅ Restore finished"
