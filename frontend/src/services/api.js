const API_BASE_URL = "";

export async function analyzeWildlifeImage(file) {
  if (!file) {
    throw new Error("No file provided.");
  }

  const formData = new FormData();
  formData.append("file", file);

  const isVideo = file.type.startsWith("video/");
  const endpoint = isVideo ? "/predict-video" : "/predict";

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to analyze file.");
  }

  return response.json();
}