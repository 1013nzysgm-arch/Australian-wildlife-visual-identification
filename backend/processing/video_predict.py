import os
from collections import Counter

FRAME_DIR = "video_frames"

counter = Counter()

for filename in os.listdir(FRAME_DIR):

    if not filename.endswith(".jpg"):
        continue

    species = "Alectura_lathami"

    counter[species] += 1

print(dict(counter))