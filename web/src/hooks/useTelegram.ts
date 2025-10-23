export function useTelegram() {
  const tg = (window as any).Telegram?.WebApp;
  console.log(window);

  console.log("Telegram object:", tg);
  console.log("initDataUnsafe:", tg?.initDataUnsafe);
  
  const onClose = () => tg?.close();
  const onExpand = () => tg?.expand();
  const user = tg?.initDataUnsafe?.user;

  return { tg, user, onClose, onExpand };
}
