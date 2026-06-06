const API_BASE_URL = "http://127.0.0.1:8000";

export async function analyzeWildlifeImage(imageFile) {
  if (!imageFile) {
    throw new Error("No image file provided.");
  }

  const response = await fetch(`${API_BASE_URL}/predict`, {
    method: "POST",
  });

  if (!response.ok) {
    throw new Error("Failed to analyze image.");
  }

  return response.json();
}