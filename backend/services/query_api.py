from backend.services.firestore_service import db


class QueryAPI:

    def find_by_species(self, species_name):
        results = []
        search_text = species_name.lower().strip()

        docs = db.collection("files").stream()

        for doc in docs:
            data = doc.to_dict()
            tags = data.get("tags", {})

            if not search_text:
                results.append(data)
                continue

            for tag_name in tags.keys():
                tag_text = tag_name.lower().strip()

                if search_text in tag_text or tag_text in search_text:
                    results.append(data)
                    break

        return results


    def find_by_species_count(self, species_name, min_count):

        results = []

        docs = db.collection("files").stream()

        for doc in docs:
            data = doc.to_dict()

            tags = data.get("tags", {})

            if tags.get(species_name, 0) >= min_count:
                results.append(data)

        return results


    def find_by_multiple_species(self, query_tags):

        results = []

        docs = db.collection("files").stream()

        for doc in docs:
            data = doc.to_dict()

            tags = data.get("tags", {})

            match = True

            for species, min_count in query_tags.items():

                if tags.get(species, 0) < min_count:
                    match = False
                    break

            if match:
                results.append(data)

        return results


    def find_by_thumbnail_url(self, thumbnail_url):

        docs = (
            db.collection("files")
            .where("thumbnail_url", "==", thumbnail_url)
            .stream()
        )

        for doc in docs:
            data = doc.to_dict()
            return data.get("original_url")

        return None