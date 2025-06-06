# app/database.py
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

DATABASE_URL = "postgresql://PomodoraDB_owner:npg_y2FqpmP7LMUs@ep-wandering-pond-a8ryntes-pooler.eastus2.azure.neon.tech/PomodoraDB?sslmode=require"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()
