import { Webhook } from "svix";
import { headers } from "next/headers";
import pool from "@/lib/db"; // your PostgreSQL pool connection
import { NextResponse } from "next/server";

const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET || "";

export async function POST(req) {
  // 1. Read headers and raw body
  const payload = await req.text();
  const headerPayload = Object.fromEntries(headers());

  const svix = new Webhook(WEBHOOK_SECRET);

  let event;
  try {
    event = svix.verify(payload, headerPayload);
  } catch (err) {
    console.error("Webhook verification failed:", err);
    return new Response("Invalid signature", { status: 400 });
  }

  // 2. Handle event
  if (event.type === "user.created") {
    const user = event.data;
    const email = user.email_addresses?.[0]?.email_address;
    const userId = user.id;
    const role = user.public_metadata?.role || "user";

    try {
      await pool.query(
        `INSERT INTO users (id, email, role)
         VALUES ($1, $2, $3)
         ON CONFLICT (id) DO NOTHING`,
        [userId, email, role]
      );
    } catch (e) {
      console.error("❌ Error syncing user:", e);
      return NextResponse.json({ error: "DB error" }, { status: 500 });
    }
  }

  return NextResponse.json({ success: true }, { status: 200 });
}
