# Apply Terraform
tf-apply:
    cd infra && terraform apply -var-file=envs/prod.tfvars

# Destroy Terraform
tf-destroy:
    cd infra && terraform destroy -var-file=envs/prod.tfvars


docker-up:
	@echo "Starting Docker Compose..."
	docker compose up -d
	@echo "Docker Compose stack is up."
    
# Docker-related
.PHONY: docker-clean
docker-clean:
	docker compose down
	@echo "Removing Postgres data volume..."
	docker volume rm my-turborepo_postgres_data || true
	@echo "Docker stopped and volume removed."

# Migration-related
.PHONY: migration-create
migration-create:
ifndef name
	$(error Migration name is required. Usage: make migration-create name=CreateUsers)
endif
	@echo "Generating migration '$(name)'..."
	cd apps/api && mkdir -p src/modules/db/migrations
	cd apps/api && npm run migration:create --name=$(name)
	@echo "Migration '$(name)' created."
