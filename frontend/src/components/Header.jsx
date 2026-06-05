function Header() {
  return (
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
  );
}

export default Header;