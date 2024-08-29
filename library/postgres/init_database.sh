#!/usr/bin/bash

set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE USER root WITH PASSWORD '5987263442';
    GRANT ALL PRIVILEGES ON DATABASE database_pse TO root;
    CREATE DATABASE database_pse;
    CREATE USER pse WITH PASSWORD '5987263442';
    GRANT ALL PRIVILEGES ON DATABASE database_pse TO pse;
    
    CREATE TABLE IF NOT EXISTS pse.questions (
    id SERIAL PRIMARY KEY,
    question_text TEXT NOT NULL,
    answers TEXT[] NOT NULL,
    correct_answers TEXT[]  NOT NULL
);
EOSQL