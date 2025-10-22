import fetch from "node-fetch";

const TOKEN = "8439443354:AAEzZjR0O5JQCENCNXfTAcw5utj1jeINvgI";
const CHAT_ID = "700544750";
const WEBAPP_URL = "https://telegram-web-app-bot-xi.vercel.app";

fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    chat_id: CHAT_ID,
    text: "Open my Telegram WebApp 🚀",
    reply_markup: {
      inline_keyboard: [[{ text: "Open App", web_app: { url: WEBAPP_URL } }]],
    },
  }),
})
  .then((res) => res.json())
  .then(console.log)
  .catch(console.error);
