from pydantic import BaseModel


class UserCreate(BaseModel):
    email: str
    password: str
    name: str

    
class UserResponse(BaseModel):
    id: str
    email: str
    name: str