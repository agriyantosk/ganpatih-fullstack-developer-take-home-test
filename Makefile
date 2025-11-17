DOCKER_COMPOSE ?= docker-compose.yml
CLIENT_IMAGE ?= client-app:latest
SERVER_IMAGE ?= server-app:latest

.PHONY: build up down

# build:
# 	docker build -t $(CLIENT_IMAGE) ./client
# 	docker build -t $(SERVER_IMAGE) ./server

up:
	docker compose -f $(DOCKER_COMPOSE) up --build

down:
	docker compose -f $(DOCKER_COMPOSE) down