#!/usr/bin/bash
# /wait
alembic init migrations
alembic revision --autogenerate -m "Initial migration"
alembic upgrade head
uvicorn app.main:app --host 0.0.0.0 --port 8000
