# backend/app/main.py
from fastapi import FastAPI
from backend.app.routes import usuarios, categorias, cards, card_categoria

app = FastAPI()

app.include_router(usuarios.router, prefix="/api/usuarios", tags=["usuarios"])
app.include_router(categorias.router, prefix="/api/categorias", tags=["categorias"])
app.include_router(cards.router, prefix="/api/cards", tags=["cards"])
app.include_router(card_categoria.router, prefix="/api/relacoes", tags=["relacoes"])
