import crypto from "crypto";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { initData } = await req.json();

    if (!initData) {
      return NextResponse.json({ ok: false, error: "Missing initData" });
    }

    const botToken = process.env.TELEGRAM_BOT_TOKEN!;
    const secret = crypto.createHash("sha256").update(botToken).digest();

    const data = Object.fromEntries(new URLSearchParams(initData));
    const receivedHash = data.hash;
    delete data.hash;

    const dataCheckString = Object.keys(data)
      .sort()
      .map((key) => `${key}=${data[key]}`)
      .join("\n");

    const computedHash = crypto
      .createHmac("sha256", secret)
      .update(dataCheckString)
      .digest("hex");

    if (computedHash !== receivedHash) {
      return NextResponse.json({ ok: false, error: "Invalid hash" });
    }

    const user = JSON.parse(data.user || "{}");
    return NextResponse.json({ ok: true, user });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err.message });
  }
}
