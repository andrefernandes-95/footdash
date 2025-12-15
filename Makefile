# Apply Terraform
tf-apply:
    cd infra && terraform apply -var-file=envs/prod.tfvars

# Destroy Terraform
tf-destroy:
    cd infra && terraform destroy -var-file=envs/prod.tfvars
