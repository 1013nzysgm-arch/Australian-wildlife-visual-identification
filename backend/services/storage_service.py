from pathlib import Path
from google.cloud import storage


BASE_DIR = Path(__file__).resolve().parents[1]

SERVICE_ACCOUNT_PATH = (
    BASE_DIR / "credentials" / "firestore-key.json"
)

BUCKET_NAME = "aussieecolens-storage"


class StorageService:

    def __init__(self):
        self.client = storage.Client.from_service_account_json(
            str(SERVICE_ACCOUNT_PATH)
        )
        self.bucket = self.client.bucket(BUCKET_NAME)

    def upload_file(self, local_file, destination_blob):
        blob = self.bucket.blob(destination_blob)
        blob.upload_from_filename(str(local_file))

        return f"gs://{BUCKET_NAME}/{destination_blob}"