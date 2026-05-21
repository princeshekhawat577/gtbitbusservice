"use client";

export default function Navbar() {

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/40 backdrop-blur-xl border-b border-yellow-500/20">

      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        <h1 className="text-2xl md:text-3xl font-black gold-text">
          GTBIT BUS
        </h1>

        <a
          href="#register"
          className="gold-btn px-6 py-3 rounded-xl font-bold"
        >
          Register
        </a>

      </div>

    </nav>
  );
}