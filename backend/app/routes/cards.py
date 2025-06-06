# backend/app/routes/cards.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend.app import models, schemas
from backend.app.database import SessionLocal
from fastapi import Query

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
def listar_cards(usuario_id: int = Query(...), db: Session = Depends(get_db)):
    return db.query(models.Cards).filter(models.Cards.usuario_id == usuario_id).all()

@router.get("/{id}", response_model=schemas.Card)
def obter_card(id: int, db: Session = Depends(get_db)):
    card = db.query(models.Cards).filter(models.Cards.id == id).first()
    if not card:
        raise HTTPException(status_code=404, detail="Card não encontrado")
    return card

@router.put("/{id}", response_model=schemas.Card)
def atualizar_card(id: int, card_data: schemas.CardCreate, db: Session = Depends(get_db)):
    card = db.query(models.Cards).filter(models.Cards.id == id).first()
    if not card:
        raise HTTPException(status_code=404, detail="Card não encontrado")
    
    for key, value in card_data.dict().items():
        setattr(card, key, value)

    db.commit()
    db.refresh(card)
    return card

@router.delete("/{id}")
def deletar_card(id: int, db: Session = Depends(get_db)):
    card = db.query(models.Cards).filter(models.Cards.id == id).first()
    if not card:
        raise HTTPException(status_code=404, detail="Card não encontrado")
    
    db.delete(card)
    db.commit()
    return {"mensagem": "Card deletado com sucesso"}
