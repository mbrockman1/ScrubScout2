from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# This creates a local SQLite database file named 'scrubscout.db'
# When you move to production on DigitalOcean, you can change this to a PostgreSQL URL
SQLALCHEMY_DATABASE_URL = "sqlite:///./scrubscout.db"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()