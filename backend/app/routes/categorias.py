# backend/app/routes/categorias.py
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from backend.app import models, schemas
from backend.app.database import SessionLocal
from fastapi import HTTPException

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=schemas.Categoria)
def criar_categoria(categoria: schemas.CategoriaCreate, db: Session = Depends(get_db)):
    db_categoria = models.Categoria(**categoria.dict())
    db.add(db_categoria)
    db.commit()
    db.refresh(db_categoria)
    return db_categoria

@router.get("/", response_model=list[schemas.Categoria])
def listar_categorias(db: Session = Depends(get_db)):
    return db.query(models.Categoria).all()

@router.get("/{categoria_id}", response_model=schemas.Categoria)
def obter_categoria(categoria_id: int, db: Session = Depends(get_db)):
    categoria = db.query(models.Categoria).filter(models.Categoria.id == categoria_id).first()
    if categoria is None:
        raise HTTPException(status_code=404, detail="Categoria não encontrada")
    return categoria

@router.delete("/{categoria_id}")
def deletar_categoria(categoria_id: int, db: Session = Depends(get_db)):
    db_categoria = db.query(models.Categoria).filter(models.Categoria.id == categoria_id).first()
    if db_categoria is None:
        raise HTTPException(status_code=404, detail="Categoria não encontrada")
    
    db.delete(db_categoria)
    db.commit()
    return {"detail": "Categoria deletada com sucesso"}