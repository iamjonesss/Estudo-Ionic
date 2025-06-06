# backend/app/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.app.routes import usuarios, categorias, cards

app = FastAPI()

app.include_router(usuarios.router, prefix="/api/usuarios", tags=["usuarios"])
app.include_router(categorias.router, prefix="/api/categorias", tags=["categorias"])
app.include_router(cards.router, prefix="/api/cards", tags=["cards"])


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
