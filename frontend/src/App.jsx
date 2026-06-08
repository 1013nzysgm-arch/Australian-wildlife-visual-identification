import { useEffect, useState } from "react";
import { getCurrentUser, signInWithRedirect, signOut } from "aws-amplify/auth";
import Header from "./components/Header";
import UploadCard from "./components/UploadCard";
import ResultCard from "./components/ResultCard";
import InfoCards from "./components/InfoCards";
import { analyzeWildlifeImage } from "./services/api";
import ManagementPanel from "./components/ManagementPanel";


function App() {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  useEffect(() => {
    async function checkUser() {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        setUser(null);
      } finally {
        setAuthLoading(false);
      }
    }

    checkUser();
  }, []);
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

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        Loading authentication...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-slate-950 px-6 text-center text-white">
        <h1 className="text-4xl font-bold">AussieEcoLense</h1>
        <p className="mt-4 max-w-xl text-slate-300">
          Please sign in to access the wildlife observation platform.
        </p>

        <button
          onClick={() => signInWithRedirect()}
          className="mt-8 rounded-2xl bg-emerald-500 px-6 py-3 font-bold text-slate-950 hover:bg-emerald-400"
        >
          Sign in with AWS Cognito
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 text-white">
      <Header />

      <div className="mx-auto flex max-w-6xl justify-end px-6 pt-4">
        <button
          onClick={() => signOut()}
          className="rounded-xl border border-red-400 px-4 py-2 text-sm text-red-300 hover:bg-red-400/10"
        >
          Sign Out
        </button>
      </div>

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