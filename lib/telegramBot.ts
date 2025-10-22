import TelegramBot from "node-telegram-bot-api";

let bot: TelegramBot | null = null;

export function getBot() {
  if (!bot) {
    const token = process.env.TELEGRAM_BOT_TOKEN!;
    bot = new TelegramBot(token, { polling: true });
    console.log("🤖 Telegram bot started inside Next.js");

    bot.onText(/\/start/, async (msg) => {
      const chatId = msg.chat.id;
      const webAppUrl = process.env.NEXT_PUBLIC_WEBAPP_URL!;

      await bot?.sendMessage(chatId, "Welcome to my Telegram WebApp 🚀", {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "Open App",
                web_app: { url: webAppUrl },
              },
            ],
          ],
        },
      });
      console.log(`Sent WebApp button to chat ${chatId}`);
    });
  }
  return bot;
}
