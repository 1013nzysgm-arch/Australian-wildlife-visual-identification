from google.cloud import storage
import os


class StorageService:

    def __init__(
        self,
        service_account=None,
        bucket_name="aussieecolens-g65"
    ):

        if service_account is None:
            service_account = os.getenv(
                "GOOGLE_APPLICATION_CREDENTIALS"
            )

        if not service_account:
            raise ValueError(
                "GOOGLE_APPLICATION_CREDENTIALS is not set"
            )

        self.client = storage.Client.from_service_account_json(
            service_account
        )

        self.bucket = self.client.bucket(bucket_name)

        self.bucket_name = bucket_name

    def upload_file(self, local_file, destination_blob):

        blob = self.bucket.blob(destination_blob)

        blob.upload_from_filename(local_file)

        print("Uploaded:", local_file)

        return f"gs://{self.bucket_name}/{destination_blob}"