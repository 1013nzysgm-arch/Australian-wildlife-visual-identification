from pathlib import Path
from PIL import Image


def generate_thumbnail(input_file, output_dir="backend/temp_thumbnails"):
    output_dir = Path(output_dir)
    output_dir.mkdir(parents=True, exist_ok=True)

    input_path = Path(input_file)
    thumbnail_path = output_dir / f"thumbnail_{input_path.name}"

    img = Image.open(input_path)
    img.thumbnail((400, 400))
    img.save(thumbnail_path)

    return str(thumbnail_path)