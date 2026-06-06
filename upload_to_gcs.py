from google.cloud import storage

import os

SERVICE_ACCOUNT = os.getenv(

    "GOOGLE_APPLICATION_CREDENTIALS"

)
BUCKET_NAME = "aussieecolens-g65"


def upload_file(local_file, destination_blob):

    client = storage.Client.from_service_account_json(
        SERVICE_ACCOUNT
    )

    bucket = client.bucket(BUCKET_NAME)

    blob = bucket.blob(destination_blob)

    blob.upload_from_filename(local_file)

    print("Uploaded:", local_file)

    return f"gs://{BUCKET_NAME}/{destination_blob}"


if __name__ == "__main__":

    url = upload_file(
        "README.md",
        "test/README.md"
    )

    print("\nUpload Success:")
    print(url)