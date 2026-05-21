import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SeatCounter from "@/components/SeatCounter";
import RegistrationForm from "@/components/RegistrationForm";

export default function HomePage() {
  return (
    <main className="bg-black min-h-screen">

      <Navbar />

      <Hero />

      <div className="max-w-7xl mx-auto px-6">

        <SeatCounter />

        <RegistrationForm />

      </div>

    </main>
  );
}