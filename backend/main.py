from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="AussieEcoLense Backend",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def health_check():
    return {
        "status": "ok",
        "service": "AussieEcoLense Backend"
    }


@app.get("/health")
def health():
    return {
        "healthy": True
    }


@app.post("/predict")
def predict_placeholder():
    return {
        "species": "Alectura_lathami",
        "scientificName": "Alectura lathami",
        "confidence": 92.4,
        "category": "Native Wildlife",
        "riskLevel": "Low",
        "habitat": "Australian forests and scrublands",
        "description": "Prediction endpoint placeholder.",
        "suggestedAction": "Observe from a safe distance."
    }