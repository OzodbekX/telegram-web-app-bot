import logging
import os
from dotenv import load_dotenv
from telegram import (
    Update,
    InlineKeyboardButton,
    InlineKeyboardMarkup,
    WebAppInfo
)
from telegram.ext import (
    ApplicationBuilder,
    CommandHandler,
    ContextTypes
)

# ========= LOAD ENV =========
load_dotenv()  # loads .env file

BOT_TOKEN = os.getenv("BOT_TOKEN")
WEBAPP_URL = os.getenv("WEBAPP_URL")

if not BOT_TOKEN or not WEBAPP_URL:
    raise ValueError("❌ Missing BOT_TOKEN or WEBAPP_URL in .env file")

# ========= LOGGING =========
logging.basicConfig(
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
    level=logging.INFO
)

# ========= HANDLERS =========
async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    user = update.effective_user
    print("user:", user)
    print("WEBAPP_URL:", WEBAPP_URL)
    keyboard = [
        [
            InlineKeyboardButton(
                text="🚀 Open Mini App",
                web_app=WebAppInfo(url=WEBAPP_URL)
            )
        ]
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)

    await update.message.reply_html(
        text=f"Hello, <b>{user.first_name}</b>! 👋\nClick below to open the WebApp:",
        reply_markup=reply_markup
    )

# ========= MAIN =========
def main():
    app = ApplicationBuilder().token(BOT_TOKEN).build()
    app.add_handler(CommandHandler("start", start))

    print("🤖 Bot is running...")
    app.run_polling()

if __name__ == "__main__":
    main()
