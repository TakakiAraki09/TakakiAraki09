#!/bin/bash

# Create dist directory if it doesn't exist
mkdir -p ./dist

# Apply schema migrations using sqlite3def
cat schema/*.sql | sqlite3def ./dist/database.db
