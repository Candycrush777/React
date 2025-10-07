# app/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import router  # Importamos el router de routes.py

# Crea la instancia de FastAPI - esta es la variable "app" que busca uvicorn
app = FastAPI(
    title="Blockbuster API",
    description="API para sistema de gestión de películas Blockbuster",
    version="1.0.0"
)

# CORS - Permite que tu frontend de React se comunique con este backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],  # Puertos de React/Vite
    allow_credentials=True,
    allow_methods=["*"],  # Permite todos los métodos (GET, POST, PUT, DELETE)
    allow_headers=["*"],  # Permite todos los headers
)

# Incluye todas las rutas definidas en routes.py
app.include_router(router, prefix="/api", tags=["auth"])

# Endpoint raíz - para verificar que la API está funcionando
@app.get("/")
async def root():
    return {
        "message": "🎬 Blockbuster API funcionando!", 
        "docs": "http://localhost:8000/docs",
        "version": "1.0.0"
    }

# Endpoint de salud - para pruebas simples
@app.get("/ping")
async def ping():
    return {"message": "pong!"}