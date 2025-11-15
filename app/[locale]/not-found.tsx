export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Pagina non trovata</h2>
        <p className="text-brutalist-text-light/70 mb-8">
          La pagina che stai cercando non esiste.
        </p>
        <a
          href="/it"
          className="px-6 py-3 bg-primary text-brutalist-text-light font-bold border-brutal border-black rounded-brutal shadow-brutal hover:shadow-brutal-hover hover:-translate-x-1 hover:-translate-y-1 transition-all inline-block"
        >
          Torna alla Home
        </a>
      </div>
    </div>
  );
}