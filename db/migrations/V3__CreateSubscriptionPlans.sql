CREATE TABLE subscription_plans(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    description TEXT NULL,
    price NUMERIC(10, 2) NOT NULL DEFAULT 0,
    duration_months INTEGER NOT NULL DEFAULT 1, -- plan duration
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
