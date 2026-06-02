import { fakeResult } from "../data/fakeResult";

export async function analyzeWildlifeImage() {
  // This fake API function keeps the frontend ready for backend integration.
  // Later, replace this with a real fetch request to the backend /predict endpoint.
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(fakeResult);
    }, 1200);
  });
}