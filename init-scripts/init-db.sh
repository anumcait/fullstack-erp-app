#!/bin/bash
set -e

# Wait until Postgres is ready
until pg_isready -U postgres; do
  echo "⏳ Waiting for PostgreSQL to be ready..."
  sleep 2
done

# Count number of tables in 'public' schema
TABLE_COUNT=$(psql -U postgres -d hrdb -tAc "SELECT COUNT(*) FROM information_schema.tables WHERE table_schema='public';")

if [ "$TABLE_COUNT" -eq "0" ]; then
  echo "🛠️ No tables found. Restoring from backup..."

  if [ -f /pg_backup/hrdb.backup ]; then
    pg_restore --no-owner --clean --if-exists -U postgres -d hrdb /pg_backup/hrdb.backup
    echo "✅ Restore completed."
  else
    echo "❌ Backup file not found at /pg_backup/hrdb.backup"
    exit 1
  fi
else
  echo "✅ Database already initialized. Skipping restore."
fi
