"use client";

import { motion } from "framer-motion";

export default function Hero() {

  return (
    <section className="relative h-screen overflow-hidden">

      {/* Background Image */}
      <img
        src="https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80&w=2070&auto=format&fit=crop"
        alt="Bus"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Content */}
      <div className="relative z-20 h-full flex items-center justify-center text-center px-6">

        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >

          <h1 className="text-5xl md:text-7xl font-black gold-text leading-tight">
            GTBIT
            <br />
            BUS SERVICE
          </h1>

          <p className="mt-6 text-gray-300 text-lg md:text-2xl max-w-2xl mx-auto">
            Premium Luxury AC Bus Service
            for End Semester Examination
          </p>

          <a
            href="#register"
            className="inline-block mt-10 gold-btn px-8 py-4 rounded-2xl font-bold text-lg"
          >
            Book Seat Now
          </a>

        </motion.div>

      </div>

    </section>
  );
}