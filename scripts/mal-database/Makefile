# Makefile for mal-database

# Variables
DB_FILE := ./dist/database.db
DB_BACKUP_FILE := ./dist/database.db.backup
SCHEMA_DIR := ./schema
SCHEMA_FILES := $(SCHEMA_DIR)/*.sql

# Default target
.DEFAULT_GOAL := help

# Phony targets
.PHONY: help db-init db-reset db-backup db-restore db-schema db-clean

# Help command
help:
	@echo "Available commands:"
	@echo "  make db-init      - Initialize database with schema (creates if not exists)"
	@echo "  make db-reset     - Reset database (delete and recreate)"
	@echo "  make db-backup    - Backup current database"
	@echo "  make db-restore   - Restore database from backup"
	@echo "  make db-schema    - Show database schema"
	@echo "  make db-clean     - Remove database and backup files"

# Initialize database (creates if not exists)
db-init:
	@echo "Initializing database..."
	@mkdir -p ./dist
	@cat $(SCHEMA_FILES) | sqlite3 $(DB_FILE)
	@echo "Database initialized successfully!"

# Reset database (delete and recreate)
db-reset:
	@echo "Resetting database..."
	@rm -f $(DB_FILE)
	@mkdir -p ./dist
	@cat $(SCHEMA_FILES) | sqlite3 $(DB_FILE)
	@echo "Database reset successfully!"

# Backup database
db-backup:
	@if [ ! -f $(DB_FILE) ]; then \
		echo "Error: Database file does not exist!"; \
		exit 1; \
	fi
	@echo "Backing up database..."
	@cp $(DB_FILE) $(DB_BACKUP_FILE)
	@echo "Database backed up to $(DB_BACKUP_FILE)"

# Restore database from backup
db-restore:
	@if [ ! -f $(DB_BACKUP_FILE) ]; then \
		echo "Error: Backup file does not exist!"; \
		exit 1; \
	fi
	@echo "Restoring database from backup..."
	@cp $(DB_BACKUP_FILE) $(DB_FILE)
	@echo "Database restored from $(DB_BACKUP_FILE)"

# Show database schema
db-schema:
	@if [ ! -f $(DB_FILE) ]; then \
		echo "Error: Database file does not exist!"; \
		exit 1; \
	fi
	@echo "Database schema:"
	@sqlite3 $(DB_FILE) ".schema"

# Clean database and backup files
db-clean:
	@echo "Cleaning database files..."
	@rm -f $(DB_FILE) $(DB_BACKUP_FILE)
	@echo "Database files removed!"
