# backend/app/routes/cards.py
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from backend.app import models, schemas
from backend.app.database import SessionLocal

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=schemas.Card)
def criar_card(card: schemas.CardCreate, db: Session = Depends(get_db)):
    db_card = models.Cards(**card.dict())
    db.add(db_card)
    db.commit()
    db.refresh(db_card)
    return db_card

@router.get("/", response_model=list[schemas.Card])
def listar_cards(db: Session = Depends(get_db)):
    return db.query(models.Cards).all()
