import React, { ReactNode } from "react";

interface MessageProps {
  sender: string;
  text: ReactNode;
}

const Message: React.FC<MessageProps> = ({ sender, text }) => {
  const isUser = sender === "User";

  return (
    <div
      className={`p-3 mb-2 rounded-lg 
        ${
          isUser
            ? "bg-green-100 text-gray-900 dark:bg-green-700 dark:text-gray-100"
            : "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-200"
        }
      `}
      style={{
        maxWidth: "90%",
        alignSelf: isUser ? "flex-end" : "flex-start"
      }}
    >
      <strong>{sender}:</strong> {text}
    </div>
  );
};

export default Message;
