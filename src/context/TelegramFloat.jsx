import React from "react";

const TelegramFloat = () => {
  const telegramLink = "https://t.me/prohash_official"; 

  return (
    <a
      href={telegramLink}
      target="_blank"
      rel="noopener noreferrer"
      className="telegram-float"
    >
      <img
        src="https://cdn-icons-png.flaticon.com/512/2111/2111646.png"
        alt="Telegram"
      />
    </a>
  );
};

export default TelegramFloat;