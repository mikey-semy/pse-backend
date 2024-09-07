#!/usr/bin/bash
# /wait

ls -la /usr/src/app/migrations/versions

if [ ! -f /usr/src/app/migrations/versions/*.py ]; then
    
    alembic revision --autogenerate -m "Initial migration"
    alembic upgrade head
else
    alembic upgrade head
fi
uvicorn app.main:app --host 0.0.0.0 --port 8000
