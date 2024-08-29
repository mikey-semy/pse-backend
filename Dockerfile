FROM python:3.12.1-alpine3.19

WORKDIR /usr/src/app

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN apk update \
    && apk add postgresql-client build-base postgresql-dev libpq-dev

RUN pip install --upgrade pip
COPY requirements.txt /temp/requirements.txt
RUN pip install -r /temp/requirements.txt

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.9.0/wait /wait
RUN chmod +x /wait
EXPOSE 8001

COPY . /usr/src/app
COPY ./docker-entrypoint.sh /usr/src/app/docker-entrypoint.sh
RUN chmod +x /usr/src/app/docker-entrypoint.sh


ENTRYPOINT ["sh", "/usr/src/app/docker-entrypoint.sh"]
