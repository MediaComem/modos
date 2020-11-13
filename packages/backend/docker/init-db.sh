#!/bin/bash
set -e

# Create the modos schema.
PGPASSWORD=modos psql -v ON_ERROR_STOP=1 -U modos <<-EOSQL
  CREATE SCHEMA modos;
EOSQL
