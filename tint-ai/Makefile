DOCKER_COMPOSE_DEV=docker-compose -p tint-senior-swe-technical-test-dev -f ./docker-compose.development.yaml
DOCKER_COMPOSE_TEST=docker-compose -p tint-senior-swe-technical-test-dev -f ./docker-compose.test.yaml 

db-start:
	$(DOCKER_COMPOSE_DEV) up -d

db-generate-migrations:
	./node_modules/.bin/drizzle-kit generate:pg

db-migrate:
	npm run db:migrate

db-stop:
	$(DOCKER_COMPOSE_DEV) down

test-infra-start:
	$(DOCKER_COMPOSE_TEST) up -d
	./bin/wait-for-it.sh -h localhost -p 15432 -t 60
	npm run db:migrate:test

test-infra-stop:
	$(DOCKER_COMPOSE_TEST) down

test: 
	$(MAKE) test-infra-start
	npm run test
	$(MAKE) test-infra-stop

test-watch: 
	$(MAKE) test-infra-start
	npm run test:watch
	$(MAKE) test-infra-stop

init:
	docker volume create tint-pgdata
	docker volume create tint-test-pgdata
	npm install

start: 
	$(MAKE) db-start || true
	npm run dev

sql:
	docker exec -it tint-db psql postgres://tint:tint@localhost:5432/tint

start-stripe:
	npm run stripe:start