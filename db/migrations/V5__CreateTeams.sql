CREATE TABLE teams(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE, --subdomain i.e. liverpool.myapp.com
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
