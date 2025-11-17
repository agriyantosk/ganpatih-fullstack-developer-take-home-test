DOCKER_COMPOSE ?= docker-compose.yml

.PHONY: up down reset

up:
	docker compose -f $(DOCKER_COMPOSE) up --build

down:
	docker compose -f $(DOCKER_COMPOSE) down -v
	docker volume prune -f