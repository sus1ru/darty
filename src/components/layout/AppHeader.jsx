export default function AppHeader({ dark, onToggleDark, startingScore, theme }) {
  return (
    <header
      className={`flex flex-col gap-4 rounded-lg border p-4 shadow-2xl backdrop-blur sm:flex-row sm:items-center sm:justify-between ${theme.header}`}
    >
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-500">
          {startingScore} double out
        </p>
        <h1 className={`mt-1 text-3xl font-bold tracking-normal ${theme.title}`}>
          Dart Tournament
        </h1>
      </div>
      <button
        onClick={onToggleDark}
        className={`rounded-md border px-4 py-2 text-sm font-semibold shadow-lg transition duration-300 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300 ${theme.subtleButton}`}
      >
        Toggle {dark ? "Light" : "Dark"}
      </button>
    </header>
  );
}
