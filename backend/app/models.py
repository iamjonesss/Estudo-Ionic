# backend/app/models.py
from sqlalchemy import Column, Integer, String, Date, ForeignKey, Table
from sqlalchemy.orm import relationship
from app.database import Base

class Usuario(Base):
    __tablename__ = "usuario"
    __table_args__ = {"schema": "app"}

    id = Column(Integer, primary_key=True)
    nome_usuario = Column(String, nullable=False)
    senha = Column(String, nullable=False)
    data_criacao = Column(Date)

class Categoria(Base):
    __tablename__ = "categoria"
    __table_args__ = {"schema": "app"}

    id = Column(Integer, primary_key=True)
    titulo_categoria = Column(String, nullable=False)
    descricao_categoria = Column(String)

class Cards(Base):
    __tablename__ = "cards"
    __table_args__ = {"schema": "app"}

    id = Column(Integer, primary_key=True)
    titulo_card = Column(String, nullable=False)
    descricao_card = Column(String)
    usuario_id = Column(Integer, ForeignKey("app.usuario.id", ondelete="CASCADE"))
    data_criacao = Column(Date)

class CardCategoria(Base):
    __tablename__ = "cardCategoria"
    __table_args__ = {"schema": "app"}

    card_id = Column(Integer, ForeignKey("app.cards.id", ondelete="CASCADE"), primary_key=True)
    categoria_id = Column(Integer, ForeignKey("app.Categoria.id", ondelete="CASCADE"), primary_key=True)
