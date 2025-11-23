CREATE TYPE subscription_status AS ENUM(
    'PENDING',
    'ACTIVE',
    'CANCELLED',
    'EXPIRED'
);

ALTER TABLE subscriptions ALTER COLUMN status DROP DEFAULT;

-- Cast existing column to the enum
ALTER TABLE subscriptions 
  ALTER COLUMN status TYPE subscription_status 
  USING status::text::subscription_status;

-- Set the default again
ALTER TABLE subscriptions 
  ALTER COLUMN status SET DEFAULT 'PENDING';
