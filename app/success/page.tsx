export const dynamic =
  "force-dynamic";

  "use client";

import {
  Suspense,
} from "react";

import {
  useSearchParams,
} from "next/navigation";

function SuccessContent() {

  const searchParams =
    useSearchParams();

  const token =
    searchParams.get(
      "token"
    );

  return (

    <main className="min-h-screen flex items-center justify-center px-6">

      <div className="glass rounded-3xl p-10 max-w-xl w-full text-center">

        <h1 className="text-5xl font-black gold-text">
          Booking Successful
        </h1>

        <p className="mt-6 text-xl">
          Your booking token:
        </p>

        <div className="mt-5 text-4xl font-black text-yellow-400">

          {token}

        </div>

        <p className="mt-8 text-gray-400">

          Please save your token ID for future verification.

        </p>

        <a
          href="/"
          className="gold-btn inline-block mt-10 px-8 py-4 rounded-2xl font-black"
        >
          Back to Home
        </a>

      </div>

    </main>
  );
}

export default function SuccessPage() {

  return (

    <Suspense
      fallback={

        <main className="min-h-screen flex items-center justify-center">

          <h1 className="text-4xl gold-text font-black">
            Loading...
          </h1>

        </main>
      }
    >

      <SuccessContent />

    </Suspense>
  );
}