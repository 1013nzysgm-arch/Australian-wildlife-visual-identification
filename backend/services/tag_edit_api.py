from google.cloud import firestore
from backend.services.firestore_service import FirestoreService


db = firestore.Client()


class TagEditAPI:

    def __init__(self):
        self.firestore_service = FirestoreService()

    def update_tags(self, file_id, tag_operations):

        metadata = self.firestore_service.get_file_by_id(file_id)

        if not metadata:
            return False

        tags = metadata.get("tags", {})

        for tag_name, operation in tag_operations.items():

            if operation == 1:
                if tag_name not in tags:
                    tags[tag_name] = 1

            elif operation == 0:
                tags.pop(tag_name, None)

        self.firestore_service.update_tags(
            file_id,
            tags
        )

        return True