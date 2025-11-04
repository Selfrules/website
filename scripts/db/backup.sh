#!/bin/bash

# Database Backup Script
# Automated backup with rotation and compression

set -e

# Configuration
BACKUP_DIR="${BACKUP_DIR:-./backups}"
RETENTION_DAYS="${RETENTION_DAYS:-30}"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_NAME="mattia_portfolio_${TIMESTAMP}.sql"

# Load environment variables
if [ -f .env ]; then
  export $(cat .env | grep -v '^#' | xargs)
fi

# Verify database URL
if [ -z "$DATABASE_URL" ]; then
  echo "❌ DATABASE_URL not set"
  exit 1
fi

# Create backup directory
mkdir -p "$BACKUP_DIR"

echo "🗄️  Starting database backup..."
echo "Timestamp: $TIMESTAMP"

# Extract database connection details
DB_HOST=$(echo $DATABASE_URL | sed -n 's/.*@\(.*\):.*/\1/p')
DB_PORT=$(echo $DATABASE_URL | sed -n 's/.*:\([0-9]*\)\/.*/\1/p')
DB_NAME=$(echo $DATABASE_URL | sed -n 's/.*\/\(.*\)?.*/\1/p')
DB_USER=$(echo $DATABASE_URL | sed -n 's/.*:\/\/\(.*\):.*/\1/p')
DB_PASS=$(echo $DATABASE_URL | sed -n 's/.*:\/\/.*:\(.*\)@.*/\1/p')

# Perform backup
export PGPASSWORD="$DB_PASS"
pg_dump -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" \
  --format=plain \
  --no-owner \
  --no-acl \
  --clean \
  --if-exists \
  > "$BACKUP_DIR/$BACKUP_NAME"

# Compress backup
gzip "$BACKUP_DIR/$BACKUP_NAME"
COMPRESSED_BACKUP="$BACKUP_DIR/${BACKUP_NAME}.gz"

echo "✅ Backup created: $COMPRESSED_BACKUP"

# Calculate size
BACKUP_SIZE=$(du -h "$COMPRESSED_BACKUP" | cut -f1)
echo "Size: $BACKUP_SIZE"

# Cleanup old backups
echo "🧹 Cleaning up backups older than $RETENTION_DAYS days..."
find "$BACKUP_DIR" -name "mattia_portfolio_*.sql.gz" -mtime +$RETENTION_DAYS -delete

REMAINING_BACKUPS=$(ls -1 "$BACKUP_DIR"/mattia_portfolio_*.sql.gz 2>/dev/null | wc -l)
echo "Remaining backups: $REMAINING_BACKUPS"

# Upload to cloud storage (optional)
if [ ! -z "$BACKUP_S3_BUCKET" ]; then
  echo "☁️  Uploading to S3..."
  aws s3 cp "$COMPRESSED_BACKUP" "s3://$BACKUP_S3_BUCKET/backups/"
  echo "✅ Uploaded to S3"
fi

# Send notification
if [ ! -z "$WEBHOOK_URL" ]; then
  curl -X POST "$WEBHOOK_URL" \
    -H "Content-Type: application/json" \
    -d "{
      \"text\": \"✅ Database backup completed\",
      \"backup_name\": \"$BACKUP_NAME.gz\",
      \"size\": \"$BACKUP_SIZE\",
      \"timestamp\": \"$TIMESTAMP\"
    }"
fi

echo "🎉 Backup complete!"
