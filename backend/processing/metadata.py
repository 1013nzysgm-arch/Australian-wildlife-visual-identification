import uuid
from datetime import datetime


def create_metadata(
    file_type,
    checksum,
    original_url,
    thumbnail_url,
    tags
):
    return {
        "file_id": str(uuid.uuid4()),
        "file_type": file_type,
        "checksum": checksum,
        "original_url": original_url,
        "thumbnail_url": thumbnail_url,
        "tags": tags,
        "created_at": datetime.now().isoformat()
    }