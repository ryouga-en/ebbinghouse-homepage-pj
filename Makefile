.PHONY: up down logs build clean

up:
	docker compose up -d --build

down:
	docker compose down

logs:
	docker compose logs -f

build:
	docker compose build --no-cache

clean:
	docker compose down -v --rmi all --remove-orphans