from PIL import Image
from pathlib import Path

input_file = "images/Alectura_lathami_1.JPG"

output_dir = Path("thumbnails")
output_dir.mkdir(exist_ok=True)

img = Image.open(input_file)

img.thumbnail((400, 400))

thumbnail_path = output_dir / "thumbnail.jpg"

img.save(thumbnail_path)

print("Thumbnail created:")
print(thumbnail_path)