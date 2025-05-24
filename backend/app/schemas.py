# backend/app/schemas.py
from pydantic import BaseModel
from typing import Optional
from datetime import date

# Já tinha:
class UsuarioBase(BaseModel):
    nome_usuario: str
    senha_hash: str

class UsuarioCreate(UsuarioBase):
    pass

class Usuario(UsuarioBase):
    id: int
    data_criacao: Optional[date]

    class Config:
        from_attributes = True  # Atualizado para Pydantic v2

# Novo para Categoria:
class CategoriaBase(BaseModel):
    titulo_categoria: str
    descricao_categoria: Optional[str] = None

class CategoriaCreate(CategoriaBase):
    pass

class Categoria(CategoriaBase):
    id: int

    class Config:
        from_attributes = True

# Novo para Card:
class CardBase(BaseModel):
    titulo_card: str
    descricao_card: Optional[str] = None
    usuario_id: int

class CardCreate(CardBase):
    pass

class Card(CardBase):
    id: int
    data_criacao: Optional[date]

    class Config:
        from_attributes = True

# backend/app/schemas.py

class CardCategoriaCreate(BaseModel):
    card_id: int
    categoria_id: int
