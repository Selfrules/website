#!/bin/bash

# Database Restore Script
# Restore from backup with safety checks

set -e

BACKUP_DIR="${BACKUP_DIR:-./backups}"

# Load environment variables
if [ -f .env ]; then
  export $(cat .env | grep -v '^#' | xargs)
fi

# Verify database URL
if [ -z "$DATABASE_URL" ]; then
  echo "❌ DATABASE_URL not set"
  exit 1
fi

echo "🗄️  Database Restore Tool"
echo "========================"

# List available backups
echo ""
echo "Available backups:"
ls -lh "$BACKUP_DIR"/mattia_portfolio_*.sql.gz | awk '{print NR". "$9" ("$5")"}'

echo ""
read -p "Enter backup number to restore: " BACKUP_NUM

BACKUP_FILE=$(ls -1 "$BACKUP_DIR"/mattia_portfolio_*.sql.gz | sed -n "${BACKUP_NUM}p")

if [ -z "$BACKUP_FILE" ]; then
  echo "❌ Invalid backup selection"
  exit 1
fi

echo ""
echo "⚠️  WARNING: This will replace the current database!"
echo "Backup file: $BACKUP_FILE"
read -p "Are you sure? (type 'yes' to continue): " CONFIRM

if [ "$CONFIRM" != "yes" ]; then
  echo "❌ Restore cancelled"
  exit 1
fi

# Extract database connection details
DB_HOST=$(echo $DATABASE_URL | sed -n 's/.*@\(.*\):.*/\1/p')
DB_PORT=$(echo $DATABASE_URL | sed -n 's/.*:\([0-9]*\)\/.*/\1/p')
DB_NAME=$(echo $DATABASE_URL | sed -n 's/.*\/\(.*\)?.*/\1/p')
DB_USER=$(echo $DATABASE_URL | sed -n 's/.*:\/\/\(.*\):.*/\1/p')
DB_PASS=$(echo $DATABASE_URL | sed -n 's/.*:\/\/.*:\(.*\)@.*/\1/p')

# Create safety backup first
echo "📦 Creating safety backup..."
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
SAFETY_BACKUP="$BACKUP_DIR/safety_before_restore_${TIMESTAMP}.sql.gz"

export PGPASSWORD="$DB_PASS"
pg_dump -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" | gzip > "$SAFETY_BACKUP"
echo "✅ Safety backup created: $SAFETY_BACKUP"

# Decompress backup
echo "📂 Decompressing backup..."
TEMP_SQL="/tmp/restore_$(basename $BACKUP_FILE .gz)"
gunzip -c "$BACKUP_FILE" > "$TEMP_SQL"

# Restore database
echo "🔄 Restoring database..."
psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" < "$TEMP_SQL"

# Cleanup temp file
rm "$TEMP_SQL"

echo "✅ Database restored successfully!"
echo ""
echo "Safety backup saved at: $SAFETY_BACKUP"
echo "You can restore this backup if needed"
