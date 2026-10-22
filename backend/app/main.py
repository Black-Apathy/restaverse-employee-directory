from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers.employees import router as employees_router

app = FastAPI(
    title="Restaverse Employee Directory",
    description="Search and browse employee records.",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=False,
    allow_methods=["GET"],
    allow_headers=["*"],
)


@app.get("/health", tags=["Health"])
def health_check():
    return {"status": "ok"}


app.include_router(employees_router)
