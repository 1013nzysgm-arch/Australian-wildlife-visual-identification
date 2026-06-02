function ResultCard({ result, loading }) {
  if (!result && !loading) {
    return (
      <div className="flex min-h-96 flex-col items-center justify-center rounded-2xl border border-white/10 bg-slate-950/50 p-8 text-center">
        <div className="mb-4 text-5xl">🔍</div>
        <p className="text-lg font-semibold">No result yet</p>
        <p className="mt-2 text-sm text-slate-400">
          Upload an image and click Analyze Wildlife to generate a detection result.
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex min-h-96 flex-col items-center justify-center rounded-2xl border border-white/10 bg-slate-950/50 p-8 text-center">
        <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-emerald-400 border-t-transparent"></div>
        <p className="text-lg font-semibold">Analyzing image...</p>
        <p className="mt-2 text-sm text-slate-400">
          The system is processing the uploaded wildlife image.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-emerald-400/20 bg-slate-950/60 p-5">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h4 className="text-2xl font-bold">{result.species}</h4>
          <p className="italic text-slate-400">{result.scientificName}</p>
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

      <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-2xl bg-slate-900 p-4">
          <p className="text-sm text-slate-400">Risk Level</p>
          <p className="mt-1 font-bold text-green-400">{result.riskLevel}</p>
        </div>

        <div className="rounded-2xl bg-slate-900 p-4">
          <p className="text-sm text-slate-400">Detection Status</p>
          <p className="mt-1 font-bold text-emerald-400">Detected</p>
        </div>
      </div>

      <div className="mb-5 rounded-2xl bg-slate-900 p-4">
        <p className="text-sm font-semibold text-slate-300">Habitat</p>
        <p className="mt-1 text-slate-400">{result.habitat}</p>
      </div>

      <p className="mb-5 text-slate-300">{result.description}</p>

      <div className="rounded-2xl border border-blue-400/20 bg-blue-400/10 p-4">
        <p className="mb-1 font-semibold text-blue-300">Suggested Action</p>
        <p className="text-slate-300">{result.suggestedAction}</p>
      </div>
    </div>
  );
}

export default ResultCard;