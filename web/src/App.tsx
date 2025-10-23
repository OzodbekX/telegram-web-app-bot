import React, { useEffect } from "react";
import { useTelegram } from "./hooks/useTelegram";

const App: React.FC = () => {
  const { tg, user, onClose } = useTelegram();
  useEffect(() => {
    console.log("callingf")
    tg?.ready();
  });

  return (
    <div style={{ padding: 20 }}>
      <h1>Telegram Web App 🚀</h1>
      <p>
        {user
          ? `Welcome, ${user.first_name} ${user?.last_name || ""}`
          : "Not inside Telegram "}
      </p>

      <button onClick={onClose}>Close App</button>

      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
};

export default App;
