const API_BASE_URL = import.meta.env.DEV ? "http://127.0.0.1:8000" : "";

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

export async function getAllRecords() {
  const response = await fetch(`${API_BASE_URL}/query/all`);

  if (!response.ok) {
    throw new Error("Failed to load records.");
  }

  return response.json();
}

export async function searchBySpecies(speciesName) {
  const response = await fetch(
    `${API_BASE_URL}/query/species/${encodeURIComponent(speciesName)}`
  );

  if (!response.ok) {
    throw new Error("Failed to search records.");
  }

  return response.json();
}

export async function searchByTagCounts(tags) {
  const response = await fetch(`${API_BASE_URL}/query/tags`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      tags,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to search by tag counts.");
  }

  return response.json();
}

export async function getOriginalByThumbnail(thumbnailUrl) {
  const response = await fetch(
    `${API_BASE_URL}/query/thumbnail?thumbnail_url=${encodeURIComponent(
      thumbnailUrl
    )}`
  );

  if (!response.ok) {
    throw new Error("Failed to find original file.");
  }

  return response.json();
}

export async function deleteRecord(fileId, adminKey) {
  const response = await fetch(`${API_BASE_URL}/files/${fileId}`, {
    method: "DELETE",
    headers: {
      "X-Admin-Key": adminKey,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete record.");
  }

  return response.json();
}

export async function updateRecordTags(fileId, tagOperations, adminKey) {
  const response = await fetch(`${API_BASE_URL}/files/${fileId}/tags`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "X-Admin-Key": adminKey,
    },
    body: JSON.stringify({
      tag_operations: tagOperations,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to update tags.");
  }

  return response.json();
}