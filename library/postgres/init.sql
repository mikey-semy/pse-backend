CREATE USER pse WITH PASSWORD '5987263442';

CREATE DATABASE database_pse;

GRANT ALL PRIVILEGES ON DATABASE database_pse TO pse;

CREATE TABLE IF NOT EXISTS pse.questions (
    id SERIAL PRIMARY KEY,
    question_text TEXT NOT NULL,
    answers TEXT[] NOT NULL,
    correct_answers TEXT[]  NOT NULL
);