import cv2
from pathlib import Path


def extract_frames(video_path, output_dir="backend/temp_video_frames", interval_seconds=1):
    output_dir = Path(output_dir)
    output_dir.mkdir(parents=True, exist_ok=True)

    cap = cv2.VideoCapture(str(video_path))

    fps = cap.get(cv2.CAP_PROP_FPS)
    if not fps or fps <= 0:
        fps = 25

    frame_interval = int(fps * interval_seconds)

    frame_paths = []
    frame_count = 0
    saved_count = 0

    while True:
        ret, frame = cap.read()

        if not ret:
            break

        if frame_count % frame_interval == 0:
            frame_path = output_dir / f"frame_{saved_count}.jpg"
            cv2.imwrite(str(frame_path), frame)
            frame_paths.append(str(frame_path))
            saved_count += 1

        frame_count += 1

    cap.release()

    return frame_paths