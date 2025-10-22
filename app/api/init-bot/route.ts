import { NextResponse } from "next/server";
import { getBot } from "@/lib/telegramBot";

export async function GET() {
  // Just importing getBot will ensure the bot starts polling
  getBot();
  return NextResponse.json({ ok: true, message: "Bot initialized" });
}
