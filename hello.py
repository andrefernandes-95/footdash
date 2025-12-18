import os
import psycopg2

# Read environment variables
db_url = os.getenv("DB_URL")
db_user = os.getenv("DB_USER")
db_password = os.getenv("DB_PASSWORD")

print("Starting job...")

try:
    conn = psycopg2.connect(db_url, user=db_user, password=db_password)
    cur = conn.cursor()
    cur.execute("SELECT 1;")
    result = cur.fetchone()
    print("Database connection successful! Query result:", result)
except Exception as e:
    print("Database connection failed:", e)

print("Hello World")
