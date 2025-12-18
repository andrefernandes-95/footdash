#!/bin/sh
set -e

echo "Running database migrations..."
npx typeorm-ts-node-commonjs migration:run -d dist/datasource.js

echo "Starting the API..."
exec node dist/main.js
