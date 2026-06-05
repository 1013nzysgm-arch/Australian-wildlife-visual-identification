import { fakeResult } from "../data/fakeResult";

const USE_FAKE_API = true;
const API_BASE_URL = "http://localhost:8000";

export async function analyzeWildlifeImage(imageFile) {
  if (!imageFile) {
    throw new Error("No image file provided.");
  }

  if (USE_FAKE_API) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(fakeResult);
      }, 1200);
    });
  }

  const formData = new FormData();
  formData.append("image", imageFile);

  const response = await fetch(`${API_BASE_URL}/predict`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to analyze image.");
  }

  return response.json();
}