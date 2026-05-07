export default function AppFooter({ dark }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={`border-t pt-4 text-center text-sm ${dark ? "border-white/10 text-slate-400" : "border-emerald-950/10 text-slate-600"}`}
    >
      © {currentYear} Darty. All rights reserved.
    </footer>
  );
}
