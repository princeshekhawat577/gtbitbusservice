"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function SeatCounter() {

  const [remaining, setRemaining] = useState(56);

  useEffect(() => {
    fetchSeats();
  }, []);

  async function fetchSeats() {

    const { count } = await supabase
      .from("registrations")
      .select("*", {
        count: "exact",
        head: true,
      });

    setRemaining(56 - (count || 0));
  }

  return (
    <section className="py-20">

      <div className="glass rounded-3xl p-10 text-center">

        <h2 className="text-6xl font-black gold-text">
          {remaining}
        </h2>

        <p className="text-gray-300 mt-4 text-xl">
          Luxury Seats Remaining
        </p>

      </div>

    </section>
  );
}