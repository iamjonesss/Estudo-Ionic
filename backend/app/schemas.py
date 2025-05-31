from pydantic import BaseModel
from typing import Optional
from datetime import date

# Schema base do usuário não deve ter senha direto
class UsuarioBase(BaseModel):
    nome_usuario: str

# Usado apenas na criação (senha original)
class UsuarioCreate(UsuarioBase):
    senha: str  # <--- senha limpa, não o hash

# Usado ao retornar dados do usuário (sem senha)
class Usuario(UsuarioBase):
    id: int
    data_criacao: Optional[date]

    class Config:
        from_attributes = True

# Schema para login
class LoginRequest(BaseModel):
    nome_usuario: str
    senha: str

# ---- Os demais não precisam ser alterados ---- #

class CategoriaBase(BaseModel):
    titulo_categoria: str
    descricao_categoria: Optional[str] = None

class CategoriaCreate(CategoriaBase):
    pass

class Categoria(CategoriaBase):
    id: int

    class Config:
        from_attributes = True

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

class CardCategoriaCreate(BaseModel):
    card_id: int
    categoria_id: int
