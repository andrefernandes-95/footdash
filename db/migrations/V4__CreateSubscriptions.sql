CREATE TABLE subscriptions(
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    plan_id INTEGER NOT NULL,
    start_date TIMESTAMPTZ NOT NULL DEFAULT now(),
    end_date TIMESTAMPTZ NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'PENDING',

    CONSTRAINT fk_user
        FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE,
    
    CONSTRAINT fk_plan
        FOREIGN KEY (plan_id) REFERENCES subscription_plans(id)
        ON DELETE RESTRICT
);
