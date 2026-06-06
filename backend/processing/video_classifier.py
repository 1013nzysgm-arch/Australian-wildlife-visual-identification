from collections import Counter

from backend.processing.species_classifier import classify_image


def classify_video(video_path):
    from backend.processing.video_process import extract_frames

    frame_paths = extract_frames(video_path)

    counter = Counter()
    confidences = {}

    for frame_path in frame_paths:
        prediction = classify_image(frame_path)

        species = prediction["species"]
        confidence = prediction["confidence"]

        counter[species] += 1

        if species not in confidences:
            confidences[species] = []

        confidences[species].append(confidence)

    if not counter:
        return {
            "species": "Unknown",
            "confidence": 0,
            "frame_count": 0,
            "species_counts": {}
        }

    top_species = counter.most_common(1)[0][0]
    avg_confidence = sum(confidences[top_species]) / len(confidences[top_species])

    return {
        "species": top_species,
        "confidence": round(avg_confidence, 2),
        "frame_count": len(frame_paths),
        "species_counts": dict(counter)
    }