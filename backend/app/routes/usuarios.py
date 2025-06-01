from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app import models, schemas
from app.database import SessionLocal
from app.utils import gerar_hash_senha, verificar_senha 

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=schemas.Usuario)
def criar_usuario(usuario: schemas.UsuarioCreate, db: Session = Depends(get_db)):
    usuario_existente = db.query(models.Usuario).filter(
        models.Usuario.nome_usuario == usuario.nome_usuario
    ).first()

    if usuario_existente:
        raise HTTPException(status_code=400, detail="Usuário já existe")

    senha = gerar_hash_senha(usuario.senha)
    novo_usuario = models.Usuario(
        nome_usuario=usuario.nome_usuario,
        senha=senha
    )
    db.add(novo_usuario)
    db.commit()
    db.refresh(novo_usuario)
    return novo_usuario

@router.get("/", response_model=list[schemas.Usuario])
def listar_usuarios(db: Session = Depends(get_db)):
    return db.query(models.Usuario).all()

@router.post("/login")
def login_usuario(login: schemas.LoginRequest, db: Session = Depends(get_db)):
    usuario = db.query(models.Usuario).filter(
        models.Usuario.nome_usuario == login.nome_usuario
    ).first()

    if not usuario or not verificar_senha(login.senha, usuario.senha):
        raise HTTPException(status_code=401, detail="Usuário ou senha inválidos")

    return {"mensagem": "Login bem-sucedido", "usuario_id": usuario.id}
