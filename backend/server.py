from contextlib import asynccontextmanager
from fastapi import FastAPI, APIRouter, Request, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
import os
import logging
import uuid
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
from lib.db import client, db
from lib.emailer import notify_contact_message


@asynccontextmanager
async def lifespan(app: FastAPI):
    await db.visits.create_index("ts", expireAfterSeconds=300)
    yield
    client.close()


app = FastAPI(lifespan=lifespan)

api_router = APIRouter(prefix="/api")


class ContactMessageCreate(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    email: str = Field(min_length=3, max_length=200)
    message: str = Field(min_length=1, max_length=2000)


class ContactMessage(ContactMessageCreate):
    id: str
    created_at: str


@api_router.get("/")
async def root():
    return {"message": "AARAV.EXE backend online"}


_last_contact: dict = {}


@api_router.post("/contact", response_model=ContactMessage)
async def create_contact(input: ContactMessageCreate, request: Request):
    ip = request.client.host if request.client else "unknown"
    now_ts = datetime.now(timezone.utc).timestamp()
    if now_ts - _last_contact.get(ip, 0) < 20:
        raise HTTPException(status_code=429, detail="Too many messages — try again in a moment")
    _last_contact[ip] = now_ts
    doc = ContactMessage(
        **input.model_dump(),
        id=str(uuid.uuid4()),
        created_at=datetime.now(timezone.utc).isoformat(),
    )
    await db.contact_messages.insert_one(doc.model_dump())
    try:
        await notify_contact_message(name=doc.name, email=doc.email, message=doc.message)
    except Exception:
        logging.getLogger(__name__).exception("Contact email notification failed")
    return doc


@api_router.get("/contact", response_model=List[ContactMessage])
async def list_contact():
    docs = await db.contact_messages.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    return [ContactMessage(**d) for d in docs]


class VisitStats(BaseModel):
    total: int
    online: int


@api_router.post("/visit", response_model=VisitStats)
async def track_visit():
    from pymongo import ReturnDocument
    now = datetime.now(timezone.utc)
    await db.visits.insert_one({"id": str(uuid.uuid4()), "ts": now})
    counter = await db.stats.find_one_and_update(
        {"id": "visits"}, {"$inc": {"total": 1}}, upsert=True, return_document=ReturnDocument.AFTER
    )
    online = await db.visits.count_documents({})
    return VisitStats(total=counter["total"], online=online)


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)
