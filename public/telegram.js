// Minimal safe loader — typical pages already have Telegram SDK injected by Telegram.
// This file is a simple fallback no-op to avoid errors if opened outside Telegram.
(function () {
  if (typeof window === "undefined") return;
  if (window.Telegram && window.Telegram.WebApp) return;
  window.Telegram = window.Telegram || {};
  window.Telegram.WebApp = {
    initData: null,
    initDataUnsafe: null,
    ready: function () {},
    MainButton: {
      setText: function () {},
      show: function () {},
      hide: function () {},
      onClick: function () {},
    },
    popup: function () {},
    close: function () {},
    expand: function () {},
    isExpanded: false,
  };
})();
