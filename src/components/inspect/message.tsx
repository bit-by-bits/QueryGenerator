import { ReactNode } from "react";

interface MessageProps {
  sender: string;
  text: ReactNode;
}

const Message = ({ sender, text }: MessageProps) => {
  const isUser = sender === "User";

  return (
    <div
      className={`p-2 mb-2 rounded 
        ${isUser ? "bg-[hsl(var(--chart-5))] text-black dark:text-white" : "bg-[hsl(var(--chart-4))] text-black dark:text-white"}
      `}
    >
      <strong>{sender}:</strong> {text}
    </div>
  );
};

export default Message;
