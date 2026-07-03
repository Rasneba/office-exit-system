import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const token = process.env.TELEGRAM_BOT_TOKEN!;
    const chatId = process.env.TELEGRAM_GROUP_ID!;

    const message = `
📄 OFFICE EXIT REQUEST

👤 Employee: ${body.employeeName}
🏢 Customer: ${body.customer}
📍 Branch: ${body.branch}
📌 Address: ${body.address}
📅 Date: ${body.date}
🕒 Session: ${body.session}
📝 Reason: ${body.reason}

━━━━━━━━━━━━━━
CNET SYSTEM
    `;

    const telegramRes = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
        }),
      }
    );

    const data = await telegramRes.json();

    if (!telegramRes.ok) {
      return NextResponse.json(
        { success: false, error: data },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}