#!/usr/bin/bash
echo "Запуск скрипта docker-entrypoint.sh"

# echo "Создание директории для миграций"
# mkdir -p /usr/src/app/migrations/versions

# echo "Проверка состояния базы данных и миграций"
# if ! alembic current 2>/dev/null | grep -q "head"; then
#     echo "Сброс миграций..."
#     echo "Удаление существующих файлов миграций"
#     rm -f /usr/src/app/migrations/versions/*.py
#     echo "Создание новой миграции"
#     alembic revision --autogenerate -m "Initial migration"
#     echo "Применение миграции"
#     alembic upgrade head
# else
#     echo "Обнаружена действительная версия alembic, обновление до последней версии"
#     alembic upgrade head
# fi

echo "Запуск сервера uvicorn"
uvicorn app.main:app --host 0.0.0.0 --port 8000