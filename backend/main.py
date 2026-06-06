from pathlib import Path
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from backend.processing.checksum import calculate_checksum
from backend.processing.thumbnail import generate_thumbnail
from backend.processing.metadata import create_metadata
from backend.services.firestore_service import FirestoreService

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
async def predict_placeholder(file: UploadFile = File(...)):
    upload_dir = Path("backend/temp_uploads")
    upload_dir.mkdir(parents=True, exist_ok=True)

    file_path = upload_dir / file.filename

    content = await file.read()

    with open(file_path, "wb") as f:
        f.write(content)

    checksum = calculate_checksum(file_path)
    thumbnail_path = generate_thumbnail(file_path)

    tags = {
        "Alectura_lathami": 1
    }

    metadata = create_metadata(
        file_type="image",
        checksum=checksum,
        original_url=str(file_path),
        thumbnail_url=thumbnail_path,
        tags=tags
    )

    saved_to_firestore = False

    try:
        firestore_service = FirestoreService()
        firestore_service.save_file_metadata(metadata)
        saved_to_firestore = True
    except Exception as e:
        print("Firestore save skipped or failed:", e)

    return {
        "species": "Alectura_lathami",
        "scientificName": "Alectura lathami",
        "confidence": 92.4,
        "category": "Native Wildlife",
        "riskLevel": "Low",
        "habitat": "Australian forests and scrublands",
        "description": "Image uploaded, checksummed, thumbnailed, and metadata generated successfully.",
        "suggestedAction": "Observe from a safe distance.",
        "metadata": metadata,
        "savedToFirestore": saved_to_firestore
    }