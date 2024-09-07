#!/usr/bin/bash
# /wait

mkdir -p /usr/src/app/migrations/versions
ls -la /usr/src/app/migrations

# Check if alembic_version table exists and has valid data
if ! alembic current 2>/dev/null | grep -q "head"; then
    # If not, remove existing migration files and recreate
    rm -f /usr/src/app/migrations/versions/*.py
    alembic revision --autogenerate -m "Initial migration"
    alembic upgrade head
else
    # If alembic_version is valid, just upgrade to head
    alembic upgrade head
fi

# if [ ! -f /usr/src/app/migrations/versions/*.py ]; then
#     alembic revision --autogenerate -m "Initial migration"
#     alembic upgrade head
# else
#     alembic upgrade head
# fi
uvicorn app.main:app --host 0.0.0.0 --port 8000
