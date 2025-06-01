# backend/app/routes/card_categoria.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app import models, schemas
from app.database import SessionLocal

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/")
def associar_card_categoria(relacao: schemas.CardCategoriaCreate, db: Session = Depends(get_db)):
    card = db.query(models.Cards).filter(models.Cards.id == relacao.card_id).first()
    categoria = db.query(models.Categoria).filter(models.Categoria.id == relacao.categoria_id).first()

    if not card or not categoria:
        raise HTTPException(status_code=404, detail="Card ou Categoria não encontrados")

    associacao = models.CardCategoria(**relacao.dict())
    db.add(associacao)
    db.commit()
    return {"mensagem": "Associação criada com sucesso"}

@router.get("/card/{card_id}", response_model=list[schemas.Categoria])
def listar_categorias_do_card(card_id: int, db: Session = Depends(get_db)):
    card = db.query(models.Cards).filter(models.Cards.id == card_id).first()
    if not card:
        raise HTTPException(status_code=404, detail="Card não encontrado")
