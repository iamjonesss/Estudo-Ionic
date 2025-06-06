from sqlalchemy import Column, Integer, String, Date, ForeignKey
from sqlalchemy.orm import relationship
from backend.app.database import Base

class Usuario(Base):
    __tablename__ = "usuario"
    __table_args__ = {"schema": "app"}

    id = Column(Integer, primary_key=True)
    nome_usuario = Column(String, nullable=False)
    senha = Column(String, nullable=False)
    data_criacao = Column(Date)

    cards = relationship("Cards", back_populates="usuario", cascade="all, delete")

class Categoria(Base):
    __tablename__ = "categoria"
    __table_args__ = {"schema": "app"}

    id = Column(Integer, primary_key=True)
    titulo_categoria = Column(String, nullable=False)
    descricao_categoria = Column(String)

    cards = relationship("Cards", back_populates="categoria")

class Cards(Base):
    __tablename__ = "cards"
    __table_args__ = {"schema": "app"}

    id = Column(Integer, primary_key=True)
    titulo_card = Column(String, nullable=False)
    descricao_card = Column(String)
    usuario_id = Column(Integer, ForeignKey("app.usuario.id", ondelete="CASCADE"))
    categoria_id = Column(Integer, ForeignKey("app.categoria.id", ondelete="SET NULL"))
    data_criacao = Column(Date)

    usuario = relationship("Usuario", back_populates="cards")
    categoria = relationship("Categoria", back_populates="cards")
