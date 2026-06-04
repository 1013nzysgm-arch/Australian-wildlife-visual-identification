from google.cloud import storage
from backend.firestore_service import FirestoreService


class DeleteAPI:

    def __init__(self):
        self.firestore_service = FirestoreService()
        self.storage_client = storage.Client()

    def delete_file(self, file_id):

        metadata = self.firestore_service.get_file_by_id(file_id)

        if not metadata:
            return False

        original_url = metadata.get("original_url")
        thumbnail_url = metadata.get("thumbnail_url")

        # TODO:
        # 根据 Bucket Name 和文件路径删除 GCS 文件
        # 等 Haolin 确认 Bucket 配置后补充

        self.firestore_service.delete_file(file_id)

        return True