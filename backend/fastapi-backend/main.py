from fastapi import FastAPI, HTTPException, Depends
from sqlalchemy import create_engine, Column, Integer, String, Date
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from fastapi import Query
import logging
import os
from dotenv import load_dotenv

# Database URL (Make sure to replace this with your actual DB URL)
load_dotenv()
DATABASE_URL = os.getenv("DATABASE_URL")

# Database setup
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Define Tables
class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    email = Column(String, unique=True, index=True)

class Task(Base):
    __tablename__ = "tasks"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    category = Column(String)
    deadline = Column(String)
    progress = Column(Integer, default=0)

class Reflection(Base):
    __tablename__ = "reflections"
    id = Column(Integer, primary_key=True, index=True)
    topic = Column(String, index=True)
    content = Column(String)
    date = Column(String)

Base.metadata.create_all(bind=engine)

# Create FastAPI app
app = FastAPI()

# Enable CORS for all origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency to get the database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Pydantic models for request body validation
class UserCreate(BaseModel):
    name: str
    email: str

class TaskCreate(BaseModel):
    title: str
    category: str
    deadline: str

class ReflectionCreate(BaseModel):
    topic: str
    content: str
    date: str

# Root endpoint
@app.get("/")
def home():
    return {"message": "FastAPI + AWS RDS PostgreSQL is running!"}

# Add Reflection Endpoint
@app.post("/reflections/")
def create_reflection(reflection: ReflectionCreate, db: Session = Depends(get_db)):
    new_reflection = Reflection(topic=reflection.topic, content=reflection.content, date=reflection.date)
    db.add(new_reflection)
    db.commit()
    db.refresh(new_reflection)
    
    # Log the reflection saved
    logging.info(f"New reflection saved: {new_reflection.id} - {new_reflection.topic} - {new_reflection.content}")
    
    return {"message": "Reflection created successfully!", "reflection": new_reflection}

# Get Reflections Endpoint with pagination
@app.get("/reflections/")
def get_reflections(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    reflections = db.query(Reflection).order_by(Reflection.id.desc()).offset(skip).limit(limit).all()
    return reflections

