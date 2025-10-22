import crypto from "crypto";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { initData } = await request.json();

    if (!initData) {
      return NextResponse.json({ ok: false, error: "Missing initData" }, { status: 400 });
    }

    const botToken = process.env.TELEGRAM_BOT_TOKEN!;
    const secret = crypto.createHash("sha256").update(botToken).digest();

    // Parse initData into key/value pairs
    const data = Object.fromEntries(
      new URLSearchParams(initData)
    );

    const receivedHash = data.hash;
    delete data.hash;

    // Build data_check_string
    const dataCheckString = Object.keys(data)
      .sort()
      .map((key) => `${key}=${data[key]}`)
      .join("\n");

    // Compute HMAC
    const computedHash = crypto
      .createHmac("sha256", secret)
      .update(dataCheckString)
      .digest("hex");

    if (computedHash !== receivedHash) {
      return NextResponse.json({ ok: false, error: "Invalid hash" }, { status: 403 });
    }

    // ✅ Verified
    return NextResponse.json({ ok: true, user: JSON.parse(data.user || "{}") });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e.message }, { status: 500 });
  }
}
