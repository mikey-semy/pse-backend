#!/usr/bin/bash
# /wait

if [ ! -f /usr/src/app/migrations/versions/*.py ]; then
    alembic init migrations
    alembic revision --autogenerate -m "Initial migration"
    alembic upgrade head
else
    alembic upgrade head
fi
uvicorn app.main:app --host 0.0.0.0 --port 8000
