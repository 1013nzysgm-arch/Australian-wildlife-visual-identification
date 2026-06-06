export default function UploadCard({
  image,
  fileName,
  loading,
  onImageUpload,
  onAnalyze,
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold">Image / Video Upload</h3>
          <p className="text-sm text-slate-400">
            Choose a wildlife image or video.
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
        ) : fileName ? (
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-400/10 text-3xl">
              🎥
            </div>

            <p className="font-semibold break-all">
              {fileName}
            </p>

            <p className="mt-2 text-sm text-emerald-400">
              Video ready for analysis
            </p>
          </div>
        ) : (
          <div>
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-400/10 text-3xl">
              🦘
            </div>

            <p className="text-lg font-semibold">
              Upload wildlife image or video
            </p>

            <p className="mt-2 text-sm text-slate-400">
              Click here to select an image or video from your computer.
            </p>
          </div>
        )}

        <input
          type="file"
          accept="image/*,video/*"
          className="hidden"
          onChange={onImageUpload}
        />
      </label>

      <div className="mt-5 rounded-2xl bg-slate-950/60 p-4">
        <p className="text-sm text-slate-400">Current status</p>
        <p className="mt-1 font-semibold">
          {fileName ? "Image ready for analysis" : "No image or video uploaded"}
        </p>

        {fileName && (
          <p className="mt-1 truncate text-sm text-slate-400">
            File: {fileName}
          </p>
        )}
      </div>

      <button
        onClick={onAnalyze}
        disabled={!fileName || loading}
        className="mt-5 w-full rounded-2xl bg-emerald-600 px-6 py-4 font-bold text-white transition hover:bg-emerald-500 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400"
      >
        {loading ? "Analyzing..." : "Analyze Wildlife"}
      </button>
    </div>
  );
}
