from pathlib import Path
from google.cloud import firestore


BASE_DIR = Path(__file__).resolve().parents[1]

SERVICE_ACCOUNT_PATH = (
    BASE_DIR / "credentials" / "firestore-key.json"
)

db = firestore.Client.from_service_account_json(
    str(SERVICE_ACCOUNT_PATH)
)


class FirestoreService:

    def save_file_metadata(self, metadata):
        file_id = metadata["file_id"]
        db.collection("files").document(file_id).set(metadata)
        return file_id

    def get_file_by_id(self, file_id):
        doc = db.collection("files").document(file_id).get()

        if doc.exists:
            return doc.to_dict()

        return None

    def delete_file(self, file_id):
        db.collection("files").document(file_id).delete()
        return True

    def update_tags(self, file_id, tags):
        db.collection("files").document(file_id).update(
            {
                "tags": tags
            }
        )
        return True