from pymongo import MongoClient
from pymongo.server_api import ServerApi
from dotenv import load_dotenv
import os

load_dotenv()

MONGODB_URL = os.getenv("MONGODB_URL")
DATABASE_NAME = os.getenv("DATABASE_NAME")

# Variables globales con valores por defecto
client = None
db = None
users_collection = None

try:
    client = MongoClient(MONGODB_URL, server_api=ServerApi('1'))
    db = client[DATABASE_NAME]
    
    # Test connection
    client.admin.command('ping')
    print("✅ Conectado a MongoDB Atlas correctamente!")
    
    # Solo definir collections si la conexión funciona
    users_collection = db["users"]
    movies_collection = db["movies"]
    
except Exception as e:
    print(f"❌ Error conectando a MongoDB: {e}")
    print("⚠️  La aplicación funcionará pero sin base de datos")