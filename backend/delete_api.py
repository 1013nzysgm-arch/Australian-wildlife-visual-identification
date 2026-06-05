from google.cloud import storage
from backend.firestore_service import FirestoreService


BUCKET_NAME = "aussieecolens-g65"


class DeleteAPI:

    def __init__(self):
        self.firestore_service = FirestoreService()
        self.storage_client = storage.Client()

    def _delete_gcs_object(self, gcs_url):

        if not gcs_url:
            return

        prefix = f"gs://{BUCKET_NAME}/"

        if not gcs_url.startswith(prefix):
            return

        blob_name = gcs_url.replace(prefix, "", 1)

        bucket = self.storage_client.bucket(BUCKET_NAME)

        blob = bucket.blob(blob_name)

        blob.delete()

    def delete_file(self, file_id):

        metadata = self.firestore_service.get_file_by_id(file_id)

        if not metadata:
            return False

        original_url = metadata.get("original_url")
        thumbnail_url = metadata.get("thumbnail_url")

        self._delete_gcs_object(original_url)
        self._delete_gcs_object(thumbnail_url)

        self.firestore_service.delete_file(file_id)

        return True