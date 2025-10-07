from fastapi import APIRouter, HTTPException
from app.database import users_collection
from app.models import UserCreate, UserResponse

router = APIRouter()

@router.post("/register", response_model=UserResponse)
async def register(user: UserCreate):
    # Verificar si la base de datos está disponible
    if users_collection is None:
        raise HTTPException(status_code=500, detail="Base de datos no disponible")
    
    if users_collection.find_one({"email": user.email}):
        raise HTTPException(status_code=400, detail="Email ya registrado")

    user_dict = {
        "email": user.email,
        "password": user.password,
        "name": user.name
    }

    result = users_collection.insert_one(user_dict)

    return UserResponse(
        id=str(result.inserted_id),
        email=user.email,
        name=user.name
    )


@router.get("/users")
async def get_users():
    if users_collection is None:
        return {"error": "Base de datos no disponible"}
    
    users = []
    for user in users_collection.find():
        users.append({
            "id": str(user["_id"]),
            "email": user["email"],
            "name": user["name"]
        })
    return users