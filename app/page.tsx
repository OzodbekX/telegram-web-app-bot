"use client"
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {

   const [user, setUser] = useState<any>(null);
  const [verified, setVerified] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const tg = window.Telegram?.WebApp;
    tg?.ready();
    tg?.expand();

    const initData = tg?.initData;
    const initDataUnsafe = tg?.initDataUnsafe;

    // Send initData to server for verification
    if (initData) {
      fetch("/api/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ initData }),
      })
        .then((r) => r.json())
        .then((res) => {
          setVerified(res.ok);
          setUser(res.user || res);
        })
        .catch(console.error)
        .finally(() => setLoading(false));
    } else {
      // fallback if not in Telegram
      setUser(initDataUnsafe?.user || { first_name: "Guest" });
      setLoading(false);
    }

    // Configure Telegram Main Button
    if (tg?.MainButton) {
      tg.MainButton.setText("Continue");
      tg.MainButton.show();
      tg.MainButton.onClick(() => {
        tg.close();
      });
    }
  }, []);

  if (loading) return <p className="p-4">Loading Telegram WebApp...</p>;

  return (
     <main className="p-6 text-gray-800">
      <h1 className="text-2xl font-bold mb-4">Telegram WebApp — Next.js (App Router)</h1>

      {verified ? (
        <p className="text-green-600">✅ Verified Telegram session</p>
      ) : (
        <p className="text-red-600">⚠️ Not verified</p>
      )}

      <pre className="bg-gray-100 p-4 mt-4 rounded-md text-sm">
        {JSON.stringify(user, null, 2)}
      </pre>
    </main>
  );
}
