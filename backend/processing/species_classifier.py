from pathlib import Path

import torch
import torchvision.transforms as transforms
from PIL import Image


BASE_DIR = Path(__file__).resolve().parents[1]
MODEL_PATH = BASE_DIR / "models" / "model.pt"
LABELS_PATH = BASE_DIR / "models" / "labels.txt"


if torch.cuda.is_available():
    DEVICE = "cuda"
else:
    DEVICE = "cpu"


def load_labels():
    with open(LABELS_PATH, "r", encoding="utf-8") as f:
        return [line.strip() for line in f if line.strip()]


CLASSES = load_labels()

MODEL = torch.load(
    MODEL_PATH,
    map_location=DEVICE,
    weights_only=False
)

MODEL.eval()
MODEL.to(DEVICE)


TRANSFORM = transforms.Compose([
    transforms.Resize((480, 480)),
    transforms.ToTensor(),
])


@torch.no_grad()
def classify_image(image_path):
    img = Image.open(image_path).convert("RGB")

    img = TRANSFORM(img)
    img = img.unsqueeze(0)
    img = img.permute(0, 2, 3, 1)
    img = img.to(DEVICE)

    logits = MODEL(img)
    probs = torch.softmax(logits, dim=1)[0].cpu()

    best_idx = int(torch.argmax(probs).item())

    raw_label = CLASSES[best_idx]
    common_name = raw_label.split(";")[-1]

    return {
        "species": common_name,
        "scientific_name": raw_label,
        "confidence": round(float(probs[best_idx]) * 100, 2)
    }