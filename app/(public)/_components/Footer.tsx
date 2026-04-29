export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0B0B0C]">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div>
          <p className="font-semibold text-white">Impact Draw</p>
          <p className="mt-1 text-sm text-white/45">
            Play golf. Give back. Win with purpose.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-sm text-white/55">
          <a href="#" className="transition hover:text-white">
            Terms
          </a>
          <a href="#" className="transition hover:text-white">
            Privacy
          </a>
          <a href="#" className="transition hover:text-white">
            Charities
          </a>
          <a href="#" className="transition hover:text-white">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
