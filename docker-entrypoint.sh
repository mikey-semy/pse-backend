#!/usr/bin/bash
# /wait

mkdir -p /usr/src/app/migrations/versions

# Проверка состояния базы данных и миграций
if ! alembic current 2>/dev/null | grep -q "head"; then
    echo "Resetting migrations..."
    # Удаление таблицы alembic_version, если она существует
    #psql -U $POSTGRES_USER -d $POSTGRES_DB -c "DROP TABLE IF EXISTS alembic_version;"
    # Удаление существующих файлов миграций
    rm -f /usr/src/app/migrations/versions/*.py
    # Создание новой миграции
    alembic revision --autogenerate -m "Initial migration"
    # Применение миграции
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
