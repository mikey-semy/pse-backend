FROM python:3.12.1-alpine3.19

WORKDIR /usr/src/app

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN apk update \
    && apk add postgresql-client build-base postgresql-dev libpq-dev

RUN pip install --upgrade pip
COPY requirements.txt /temp/requirements.txt
RUN pip install -r /temp/requirements.txt
    

COPY . /usr/src/app

EXPOSE 8000

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.9.0/wait /wait
RUN chmod +x /wait
CMD ["./docker-entrypoint.sh"]