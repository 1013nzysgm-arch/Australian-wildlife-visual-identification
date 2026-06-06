import cv2
import os

VIDEO_PATH = "A1 briefing.mp4"
OUTPUT_DIR = "video_frames"

os.makedirs(OUTPUT_DIR, exist_ok=True)

cap = cv2.VideoCapture(VIDEO_PATH)

fps = cap.get(cv2.CAP_PROP_FPS)

frame_count = 0
saved_count = 0

while True:
    ret, frame = cap.read()

    if not ret:
        break

    if frame_count % int(fps) == 0:
        filename = os.path.join(
            OUTPUT_DIR,
            f"frame_{saved_count}.jpg"
        )

        cv2.imwrite(filename, frame)

        print("Saved:", filename)

        saved_count += 1

    frame_count += 1

cap.release()

print(f"\nExtracted {saved_count} frames.")