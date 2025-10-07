from pymongo import MongoClient
from pymongo.server_api import ServerApi
from dotenv import load_dotenv
import os

load_dotenv()

MONGODB_URL = os.getenv("MONGODB_URL")
DATABASE_NAME = os.getenv("DATABASE_NAME")

try:
    client = MongoClient(MONGODB_URL, server_api=ServerApi('1'))
    db = client[DATABASE_NAME]
    
    # Test connection
    client.admin.command('ping')
    print("✅ Conectado a MongoDB Atlas correctamente!")
    
except Exception as e:
    print(f"❌ Error conectando a MongoDB: {e}")

# Colecciones
users_collection = db["users"]
movies_collection = db["movies"]  # Para el futuro