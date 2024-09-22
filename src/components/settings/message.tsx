import React from "react";

interface MessageProps {
  text: string;
  type: "success" | "error" | null;
}

const Message: React.FC<MessageProps> = ({ text, type }) => {
  const messageClass = type === "success" ? "text-green-500" : "text-red-500";

  return <p className={`mt-2 text-sm ${messageClass}`}>{text}</p>;
};

export default Message;
