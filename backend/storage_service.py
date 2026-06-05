from google.cloud import storage


class StorageService:

    def __init__(
        self,
        service_account="cryptic-ground-495000-v3-03e4893a60f1.json",
        bucket_name="aussieecolens-g65"
    ):
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