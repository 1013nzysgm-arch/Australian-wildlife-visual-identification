function InfoCards() {
  return (
    <section className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
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
  );
}

export default InfoCards;