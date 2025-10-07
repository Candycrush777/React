from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import router  # ← Esto es clave

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Incluir las rutas - ESTA LÍNEA FALTA
app.include_router(router, prefix="/api", tags=["users"])

@app.get("/")
async def root():
    return {"message": "✅ API funcionando con MongoDB!"}

@app.get("/test-db")
async def test_db():
    return {"message": "Ruta de prueba para DB"}