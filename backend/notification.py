from google.cloud import firestore

db = firestore.Client()


class NotificationService:

    def create_notifications(self, metadata):

        tags = metadata.get("tags", {})

        subscriptions = db.collection("subscriptions").stream()

        for sub in subscriptions:

            subscription = sub.to_dict()

            user_id = subscription.get("userId")
            species = subscription.get("species")

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