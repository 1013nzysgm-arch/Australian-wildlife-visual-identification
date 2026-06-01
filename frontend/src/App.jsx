import { useState } from "react";

function App() {
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const fakeResult = {
    species: "Eastern Grey Kangaroo",
    scientificName: "Macropus giganteus",
    confidence: 92.4,
    category: "Native Wildlife",
    riskLevel: "Low",
    habitat: "Grasslands, open forests, and coastal areas",
    description:
      "This species is commonly found in eastern Australia and plays an important role in grassland ecosystems.",
    suggestedAction:
      "Observe from a safe distance. Do not feed or approach the animal."
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      setImage(URL.createObjectURL(file));
      setFileName(file.name);
      setResult(null);
    }
  };

  const handleAnalyze = async () => {
    setLoading(true);
    setResult(null);

    // TODO: Replace this fake delay with a real backend API call later.
    setTimeout(() => {
      setResult(fakeResult);
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 text-white">
      <header className="border-b border-white/10 bg-slate-950/70 backdrop-blur">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">AussieEcoLense</h1>
            <p className="text-sm text-slate-400">
              Australian Wildlife Visual Identification
            </p>
          </div>

          <span className="hidden sm:inline-flex rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-sm text-emerald-300">
            AI-powered wildlife recognition
          </span>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        <section className="mb-10">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-emerald-300">
            FIT5225 Cloud Application
          </p>

          <h2 className="max-w-3xl text-4xl sm:text-5xl font-bold leading-tight">
            Identify Australian wildlife from images with clear ecological
            guidance.
          </h2>

          <p className="mt-5 max-w-2xl text-slate-300">
            Upload a wildlife image, run visual identification, and receive a
            structured result including species name, confidence, risk level,
            habitat, and suggested action.
          </p>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold">Image Upload</h3>
                <p className="text-sm text-slate-400">
                  Choose a JPG or PNG wildlife image.
                </p>
              </div>

              <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">
                Step 1
              </span>
            </div>

            <label className="flex min-h-64 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-emerald-400/40 bg-slate-950/50 p-6 text-center transition hover:border-emerald-300 hover:bg-emerald-400/5">
              {image ? (
                <img
                  src={image}
                  alt="Uploaded wildlife preview"
                  className="max-h-72 rounded-2xl object-contain shadow-lg"
                />
              ) : (
                <div>
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-400/10 text-3xl">
                    🦘
                  </div>
                  <p className="text-lg font-semibold">Upload wildlife image</p>
                  <p className="mt-2 text-sm text-slate-400">
                    Click here to select an image from your computer.
                  </p>
                </div>
              )}

              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </label>

            <div className="mt-5 rounded-2xl bg-slate-950/60 p-4">
              <p className="text-sm text-slate-400">Current status</p>
              <p className="mt-1 font-semibold">
                {image ? "Image ready for analysis" : "No image uploaded"}
              </p>
              {fileName && (
                <p className="mt-1 truncate text-sm text-slate-400">
                  File: {fileName}
                </p>
              )}
            </div>

            <button
              onClick={handleAnalyze}
              disabled={!image || loading}
              className="mt-5 w-full rounded-2xl bg-emerald-600 px-6 py-4 font-bold text-white transition hover:bg-emerald-500 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400"
            >
              {loading ? "Analyzing..." : "Analyze Wildlife"}
            </button>
          </div>

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

            {!result && !loading && (
              <div className="flex min-h-96 flex-col items-center justify-center rounded-2xl border border-white/10 bg-slate-950/50 p-8 text-center">
                <div className="mb-4 text-5xl">🔍</div>
                <p className="text-lg font-semibold">No result yet</p>
                <p className="mt-2 text-sm text-slate-400">
                  Upload an image and click Analyze Wildlife to generate a
                  detection result.
                </p>
              </div>
            )}

            {loading && (
              <div className="flex min-h-96 flex-col items-center justify-center rounded-2xl border border-white/10 bg-slate-950/50 p-8 text-center">
                <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-emerald-400 border-t-transparent"></div>
                <p className="text-lg font-semibold">Analyzing image...</p>
                <p className="mt-2 text-sm text-slate-400">
                  The system is processing the uploaded wildlife image.
                </p>
              </div>
            )}

            {result && (
              <div className="rounded-2xl border border-emerald-400/20 bg-slate-950/60 p-5">
                <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h4 className="text-2xl font-bold">{result.species}</h4>
                    <p className="italic text-slate-400">
                      {result.scientificName}
                    </p>
                  </div>

                  <span className="w-fit rounded-full bg-emerald-400/10 px-4 py-2 text-sm font-semibold text-emerald-300">
                    {result.category}
                  </span>
                </div>

                <div className="mb-5">
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="text-slate-400">Confidence</span>
                    <span className="font-semibold">{result.confidence}%</span>
                  </div>

                  <div className="h-3 rounded-full bg-slate-800">
                    <div
                      className="h-3 rounded-full bg-emerald-500"
                      style={{ width: `${result.confidence}%` }}
                    ></div>
                  </div>
                </div>

                <div className="mb-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="rounded-2xl bg-slate-900 p-4">
                    <p className="text-sm text-slate-400">Risk Level</p>
                    <p className="mt-1 font-bold text-green-400">
                      {result.riskLevel}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-slate-900 p-4">
                    <p className="text-sm text-slate-400">Detection Status</p>
                    <p className="mt-1 font-bold text-emerald-400">
                      Detected
                    </p>
                  </div>
                </div>

                <div className="mb-5 rounded-2xl bg-slate-900 p-4">
                  <p className="text-sm font-semibold text-slate-300">Habitat</p>
                  <p className="mt-1 text-slate-400">{result.habitat}</p>
                </div>

                <p className="mb-5 text-slate-300">{result.description}</p>

                <div className="rounded-2xl border border-blue-400/20 bg-blue-400/10 p-4">
                  <p className="mb-1 font-semibold text-blue-300">
                    Suggested Action
                  </p>
                  <p className="text-slate-300">{result.suggestedAction}</p>
                </div>
              </div>
            )}
          </div>
        </section>

        <section className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-lg font-bold">Cloud-ready</p>
            <p className="mt-2 text-sm text-slate-400">
              The frontend is designed to connect with a backend prediction API.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-lg font-bold">User-friendly</p>
            <p className="mt-2 text-sm text-slate-400">
              Clear upload, loading, empty, and result states improve usability.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-lg font-bold">Eco-focused</p>
            <p className="mt-2 text-sm text-slate-400">
              Results include ecological context and safe suggested actions.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;