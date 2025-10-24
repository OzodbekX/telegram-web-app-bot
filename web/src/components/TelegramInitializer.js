"use client";
import { useEffect } from "react";
export default function TelegramInitializer() {
    useEffect(() => {
        if (typeof window !== "undefined" && window.Telegram?.WebApp) {
            const tg = window.Telegram.WebApp;
            tg.ready();
        }
    }, []);
    return null;
}
