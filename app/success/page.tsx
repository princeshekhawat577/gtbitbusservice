"use client";

import { useSearchParams } from "next/navigation";

export default function SuccessPage() {

  const params =
    useSearchParams();

  const token =
    params.get("token");

  return (

    <main className="min-h-screen flex items-center justify-center px-6">

      <div className="glass rounded-3xl p-10 text-center max-w-xl w-full">

        <h1 className="text-5xl font-black gold-text">
          Booking Successful
        </h1>

        <p className="mt-6 text-gray-300">
          Your registration has been submitted.
        </p>

        <div className="mt-10 text-4xl font-black gold-text">
          {token}
        </div>

        <p className="mt-5 text-yellow-400">
          Payment Verification Pending
        </p>

      </div>

    </main>
  );
}