from fastapi import FastAPI, HTTPException, Depends
from sqlalchemy import create_engine, Column, Integer, String, Boolean
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from fastapi.middleware.cors import CORSMiddleware

DATABASE_URL = "postgresql://postgre:Paperpensbooks1*@mydb.ctigoas4i8rx.us-east-2.rds.amazonaws.com:5432/mydb"

#database setup
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

#Define Tables
class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index = True)
    name = Column(String, index = True)
    email = Column(String, unique=True, index=True)

class Task(Base):
    __tablename__ = "tasks"
    id = Column(Integer, primary_key=True, index = True)
    title = Column(String, index=True)
    category = Column(String)
    deadline = Column(String)
    progress = Column(Integer, default = 0)

Base.metadata.create_all(bind=engine)
app = FastAPI()

app.add_middleware (
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

#adding API Routes
@app.get("/")
def home():
    return {"message": "FastAPI + AWS RDS PostgreSQL is running!"}

#Add User Endpoint
@app.post("/users/")
def create_user(name: str, email: str, db: Session = Depends(get_db)):
    new_user = User(name=name, email=email)
    db.add(new_user)
    db.commit()
    
    db.refresh(new_user)

@app.get("/users/")
def get_users(db: Session = Depends(get_db)):
    users = db.query(User).all()
    return users

#Add Task Endpoints
@app.post("/tasks/")
def create_task(title: str, category: str, deadline: str, db: Session = Depends(get_db)):
    new_task = Task(title=title, category=category, deadline=deadline, progress=0)
    db.add(new_task)
    db.commit()
    db.refresh(new_task)
    return new_task

@app.get("/tasks/")
def get_tasks(db: Session = Depends(get_db)):
    tasks = db.query(Task).all()
    return tasks