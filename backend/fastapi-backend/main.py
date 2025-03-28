from fastapi import FastAPI, HTTPException, Depends
from sqlalchemy import create_engine, Column, Integer, String, Boolean
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from fastapi import Query

DATABASE_URL = "postgresql://postgres:Paperpensbooks1%21@my-db-instance.ctigoas4i8rx.us-east-2.rds.amazonaws.com:5432/postgres"


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

# Root endpoint
@app.get("/")
def home():
    return {"message": "FastAPI + AWS RDS PostgreSQL is running!"}

# Add User Endpoint
@app.post("/users/")
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    # Check if the user already exists
    existing_user = db.query(User).filter(User.email == user.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered.")
    
    new_user = User(name=user.name, email=user.email)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"message": "User created successfully!", "user": new_user}

# Get Users Endpoint with pagination
@app.get("/users/")
def get_users(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    users = db.query(User).offset(skip).limit(limit).all()
    return users

# Add Task Endpoint
@app.post("/tasks/")
def create_task(task: TaskCreate, db: Session = Depends(get_db)):
    new_task = Task(title=task.title, category=task.category, deadline=task.deadline, progress=0)
    db.add(new_task)
    db.commit()
    db.refresh(new_task)
    return {"message": "Task created successfully!", "task": new_task}

# Get Tasks Endpoint with pagination
@app.get("/tasks/")
def get_tasks(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    tasks = db.query(Task).offset(skip).limit(limit).all()
    return tasks

# Add Reflection Endpoint
@app.post("/reflections/")
def create_reflection(reflection: ReflectionCreate, db: Session = Depends(get_db)):
    new_reflection = Reflection(topic=reflection.topic, content=reflection.content)
    db.add(new_reflection)
    db.commit()
    db.refresh(new_reflection)
    return {"message": "Reflection created successfully!", "reflection": new_reflection}

# Get Reflections Endpoint with pagination
@app.get("/reflections/")
def get_reflections(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    reflections = db.query(Reflection).offset(skip).limit(limit).all()
    return reflections
