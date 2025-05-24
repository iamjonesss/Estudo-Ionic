# backend/app/models.py
from sqlalchemy import Column, Integer, String, Date, ForeignKey, Table
from sqlalchemy.orm import relationship
from backend.app.database import Base

class Usuario(Base):
    __tablename__ = "Usuario"
    __table_args__ = {"schema": "App"}

    id = Column(Integer, primary_key=True)
    nome_usuario = Column(String, nullable=False)
    senha_hash = Column(String, nullable=False)
    data_criacao = Column(Date)

class Categoria(Base):
    __tablename__ = "Categoria"
    __table_args__ = {"schema": "App"}

    id = Column(Integer, primary_key=True)
    titulo_categoria = Column(String, nullable=False)
    descricao_categoria = Column(String)

class Cards(Base):
    __tablename__ = "Cards"
    __table_args__ = {"schema": "App"}

    id = Column(Integer, primary_key=True)
    titulo_card = Column(String, nullable=False)
    descricao_card = Column(String)
    usuario_id = Column(Integer, ForeignKey("App.Usuario.id", ondelete="CASCADE"))
    data_criacao = Column(Date)

class CardCategoria(Base):
    __tablename__ = "CardCategoria"
    __table_args__ = {"schema": "App"}

    card_id = Column(Integer, ForeignKey("App.Cards.id", ondelete="CASCADE"), primary_key=True)
    categoria_id = Column(Integer, ForeignKey("App.Categoria.id", ondelete="CASCADE"), primary_key=True)
