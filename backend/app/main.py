# app/main.py - MÍNIMO
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "✅ API funcionando!"}

@app.get("/test-db")
def test_db():
    return {"message": "Ruta para probar DB después"}