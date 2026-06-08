from google.cloud import firestore
from backend.services.firestore_service import db


class NotificationService:

    def create_notifications(self, metadata):

        tags = metadata.get("tags", {})

        subscriptions = db.collection("subscriptions").stream()

        for sub in subscriptions:

            subscription = sub.to_dict()

            user_id = subscription.get("userId")

            if not user_id:
                continue

            species = subscription.get("species")

            if not species:
                continue

            if species in tags:

                db.collection("notifications").add(
                    {
                        "userId": user_id,
                        "species": species,
                        "fileId": metadata.get("file_id"),
                        "message": f"New {species} detected",
                        "createdAt": firestore.SERVER_TIMESTAMP,
                    }
                )

        return True