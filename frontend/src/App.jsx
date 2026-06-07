import { useState } from "react";
import Header from "./components/Header";
import UploadCard from "./components/UploadCard";
import ResultCard from "./components/ResultCard";
import InfoCards from "./components/InfoCards";
import { analyzeWildlifeImage } from "./services/api";
import ManagementPanel from "./components/ManagementPanel";


function App() {
  const [image, setImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleImageUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      setSelectedFile(file);

      if (file.type.startsWith("image/")) {
        setImage(URL.createObjectURL(file));
      } else {
        setImage(null);
      }

      setFileName(file.name);
    }
  };

  const handleAnalyze = async () => {
    setLoading(true);
    setResult(null);
    setError("");

    try {
      const prediction = await analyzeWildlifeImage(selectedFile);
      setResult(prediction);
    } catch (err) {
      setError(err.message || "Analysis failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 text-white">
      <Header />

      <main className="mx-auto max-w-6xl px-6 py-10">
        <section className="mb-10">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-emerald-300">
            FIT5225 Cloud Application
          </p>

          <h2 className="max-w-3xl text-4xl font-bold leading-tight sm:text-5xl">
            Identify Australian wildlife from images with clear ecological
            guidance.
          </h2>

          <p className="mt-5 max-w-2xl text-slate-300">
            Upload a wildlife image, run visual identification, and receive a
            structured result including species name, confidence, risk level,
            habitat, and suggested action.
          </p>
        </section>

        <section className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <UploadCard
            image={image}
            fileName={fileName}
            loading={loading}
            onImageUpload={handleImageUpload}
            onAnalyze={handleAnalyze}
          />

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold">Identification Result</h3>
                <p className="text-sm text-slate-400">
                  AI prediction and ecological information.
                </p>
              </div>

              <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">
                Step 2
              </span>
            </div>

            <ResultCard result={result} loading={loading} error={error} />
          </div>
        </section>

        <InfoCards />
        <ManagementPanel />
      </main>
    </div>
  );
}

export default App;