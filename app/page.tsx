"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const [verified, setVerified] = useState(false);
  console.log("user:", user);

  useEffect(() => {
    if (typeof window === "undefined") {
      console.log("Window is undefined");
      return
    };

    const tg = window.Telegram?.WebApp;
    if (!tg) {
      setUser({ first_name: "Guest (outside Telegram)" });
      return;
    }

    tg.ready();
    tg.expand();

    const initData = tg.initData;
    const initDataUnsafe = tg.initDataUnsafe;

    console.log("initData:", initData);
    console.log("initDataUnsafe:", initDataUnsafe);

    if (initData && initData.length > 0) {
      fetch("/api/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ initData }),
      })
        .then((r) => r.json())
        .then((res) => {
          if (res.ok) {
            setVerified(true);
            setUser(res.user);
          } else {
            setVerified(false);
            setUser(initDataUnsafe?.user || { first_name: "Unverified" });
          }
        })
        .catch((e) => {
          console.error("Verification failed:", e);
          setVerified(false);
          setUser(initDataUnsafe?.user || { first_name: "Unknown" });
        });
    } else if (initDataUnsafe?.user) {
      setUser(initDataUnsafe.user);
    } else {
      setUser({ first_name: "Guest" });
    }

    // Telegram MainButton
    if (tg.MainButton) {
      tg.MainButton.setText("Continue");
      tg.MainButton.show();
      tg.MainButton.onClick(() => tg.close());
    }
    console.log("initData:", initData);
    console.log("initDataUnsafe:", initDataUnsafe);
  }, []);

  

  return (
    <main className="p-6 text-gray-800">
      <h1 className="text-2xl font-bold mb-4">Telegram Web App 🚀</h1>
      <p>Verified: {verified ? "✅" : "❌"}</p>
      <pre className="bg-gray-100 p-4 rounded text-sm mt-4">
        {JSON.stringify(user, null, 2)}
      </pre>
    </main>
  );
}
