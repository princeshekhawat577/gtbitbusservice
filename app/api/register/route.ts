export const dynamic =
  "force-dynamic";

  import { NextResponse } from "next/server";

import { supabase } from "@/lib/supabase";

import { generateToken } from "@/lib/token";

export async function POST(req: Request) {

  try {

    const body = await req.json();

    // TOTAL SEATS CHECK
    const { count } = await supabase
      .from("registrations")
      .select("*", {
        count: "exact",
        head: true,
      });

    if ((count || 0) >= 56) {

      return NextResponse.json({
        success: false,
        message: "Seats Full",
      });
    }

    // DUPLICATE ENROLLMENT
    const { data: enrollment } =
      await supabase
        .from("registrations")
        .select("*")
        .eq(
          "enrollment_number",
          body.enrollment_number
        )
        .single();

    if (enrollment) {

      return NextResponse.json({
        success: false,
        message:
          "Enrollment already registered",
      });
    }

    // DUPLICATE WHATSAPP
    const { data: whatsapp } =
      await supabase
        .from("registrations")
        .select("*")
        .eq(
          "whatsapp_number",
          body.whatsapp_number
        )
        .single();

    if (whatsapp) {

      return NextResponse.json({
        success: false,
        message:
          "WhatsApp already registered",
      });
    }

    // TOKEN
    const token =
      generateToken(count || 0);

    // INSERT DATA
    const { error } =
      await supabase
        .from("registrations")
        .insert([
          {
            ...body,
            token_id: token,
          },
        ]);

    if (error) {
      throw error;
    }

    return NextResponse.json({
      success: true,
      token,
    });

  } catch (err) {

    console.log(err);

    return NextResponse.json({
      success: false,
      message: "Server Error",
    });
  }
}