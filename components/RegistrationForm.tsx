"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  registrationSchema,
  RegistrationType,
} from "@/lib/validations";

import { uploadFile } from "@/lib/upload";

export default function RegistrationForm() {

  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  const [studentPhoto, setStudentPhoto] =
    useState<File | null>(null);

  const [idCard, setIdCard] =
    useState<File | null>(null);

  const [paymentScreenshot, setPaymentScreenshot] =
    useState<File | null>(null);

  const {
    register,
    handleSubmit,
  } = useForm<RegistrationType>({
    resolver:
      zodResolver(registrationSchema),
  });

  async function onSubmit(
    data: RegistrationType
  ) {

    try {

      setLoading(true);

      if (
        !studentPhoto ||
        !idCard ||
        !paymentScreenshot
      ) {
        alert("Upload all files");
        return;
      }

      // UPLOAD FILES
      const studentPhotoUrl =
        await uploadFile(
          studentPhoto,
          "student-photos"
        );

      const idCardUrl =
        await uploadFile(
          idCard,
          "id-cards"
        );

      const paymentScreenshotUrl =
        await uploadFile(
          paymentScreenshot,
          "payment-screenshots"
        );

      // SAVE DATA
      const response =
        await fetch(
          "/api/register",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              ...data,

              student_photo_url:
                studentPhotoUrl,

              id_card_photo_url:
                idCardUrl,

              payment_screenshot_url:
                paymentScreenshotUrl,
            }),
          }
        );

      const result =
        await response.json();

      if (!result.success) {

        alert(result.message);

        return;
      }

      router.push(
        `/success?token=${result.token}`
      );

    } catch (err) {

      console.log("FULL ERROR:", err);

      alert("Something went wrong");

    } finally {

      setLoading(false);
    }
  }

  return (

    <section
      id="register"
      className="pb-24"
    >

      <div className="glass rounded-3xl p-8 md:p-12">

        <h2 className="text-4xl md:text-5xl font-black gold-text text-center">
          Register Now
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-10"
        >

          <input
            {...register("full_name")}
            placeholder="Full Name"
            className="p-5 rounded-2xl bg-black/40 border border-yellow-500/20"
          />

          <input
            {...register("email")}
            placeholder="Email Address"
            className="p-5 rounded-2xl bg-black/40 border border-yellow-500/20"
          />

          <input
            {...register("enrollment_number")}
            placeholder="Enrollment Number"
            className="p-5 rounded-2xl bg-black/40 border border-yellow-500/20"
          />

          <input
            {...register("whatsapp_number")}
            placeholder="WhatsApp Number"
            className="p-5 rounded-2xl bg-black/40 border border-yellow-500/20"
          />

          <select
            {...register("gender")}
            className="p-5 rounded-2xl bg-black/40 border border-yellow-500/20"
          >
            <option value="">
              Select Gender
            </option>

            <option value="Male">
              Male
            </option>

            <option value="Female">
              Female
            </option>

          </select>

          <input
            {...register("transaction_id")}
            placeholder="Transaction ID"
            className="p-5 rounded-2xl bg-black/40 border border-yellow-500/20"
          />

          <input
            {...register("payment_sender_name")}
            placeholder="Payment Sender Name"
            className="p-5 rounded-2xl bg-black/40 border border-yellow-500/20 md:col-span-2"
          />

          {/* PAYMENT SECTION */}

          <div className="md:col-span-2 glass rounded-2xl p-6 text-center">

            <h3 className="text-2xl font-bold gold-text">
              Payment Details
            </h3>

            <img
              src="/qr/qr.png"
              className="w-56 mx-auto mt-5 rounded-2xl"
            />

            <p className="mt-5 text-lg">
              UPI ID:
              {" "}
              {process.env.NEXT_PUBLIC_UPI_ID}
            </p>

            <p className="mt-2 text-lg">
              Payee:
              {" "}
              {process.env.NEXT_PUBLIC_PAYEE_NAME}
            </p>

            <p className="mt-2 text-2xl gold-text font-black">
              ₹
              {process.env.NEXT_PUBLIC_BUS_PRICE}
            </p>

          </div>

          {/* FILE UPLOADS */}

          <div className="md:col-span-2">

            <label className="block mb-2">
              Student Photo
            </label>

            <input
              type="file"
              onChange={(e) =>
                setStudentPhoto(
                  e.target.files?.[0] || null
                )
              }
            />

          </div>

          <div className="md:col-span-2">

            <label className="block mb-2">
              College ID Card
            </label>

            <input
              type="file"
              onChange={(e) =>
                setIdCard(
                  e.target.files?.[0] || null
                )
              }
            />

          </div>

          <div className="md:col-span-2">

            <label className="block mb-2">
              Payment Screenshot
            </label>

            <input
              type="file"
              onChange={(e) =>
                setPaymentScreenshot(
                  e.target.files?.[0] || null
                )
              }
            />

          </div>

          <button
            type="submit"
            disabled={loading}
            className="gold-btn py-5 rounded-2xl text-xl font-black md:col-span-2"
          >
            {loading
              ? "Submitting..."
              : "Confirm Booking"}
          </button>

        </form>

      </div>

    </section>
  );
}