from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

# 우리가 만든 분석 로직 가져오기
from app.analysis import process_user_query

app = FastAPI()

# CORS 설정 (프론트엔드 연결용)
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 데이터 받을 형식 정의
class QueryRequest(BaseModel):
    user_input: str

@app.get("/")
def read_root():
    return {"message": "AI Analysis Server is running independently!"}

@app.post("/api/analyze")
def analyze(request: QueryRequest):
    result = process_user_query(request.user_input)
    return {"response": result}