import uuid
import json
from datetime import datetime

metadata = {
    "file_id": str(uuid.uuid4()),
    "file_type": "image",

    "checksum": "a55dc44ee044c09230929b247b78992e7e9b833bc755f083e093db8b681f6854",

    "original_url": "images/Alectura_lathami_1.JPG",

    "thumbnail_url": "thumbnails/thumbnail.jpg",

    "tags": {
        "Alectura_lathami": 1
    },

    "created_at": datetime.now().isoformat()
}

print(json.dumps(metadata, indent=4))