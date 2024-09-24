import { useState, useRef, useEffect } from "react";
import { CornerDownLeft, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useFilters } from "@/context/FilterContext/FiltersContextUser";
import patients from "@/data/patients.json";
import { filterPatients } from "@/components/queries/filters";
import Message from "@/components/inspect/message";

export const description =
  "Inspect page for the Query Generator app. Allows users to inspect the output of the API URL.";

const Inspect = () => {
  const { filters } = useFilters();
  const [apiUrl, setApiUrl] = useState("");
  const [messages, setMessages] = useState<
    { sender: string; text: string | object }[]
  >([]);
  const [error, setError] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    addMessage("User", apiUrl);

    try {
      if (!apiUrl.includes("?")) {
        throw new Error("API URL must include query parameters after '?'.");
      }

      const filteredPatients = filterPatients(patients, {
        ...filters,
        ...parseQueryFilters(apiUrl)
      });

      addMessage(
        "System",
        filteredPatients.length > 0 ? filteredPatients : "No data found."
      );
    } catch (err) {
      const errorMessage = (err as Error).message || "An error occurred.";
      setError(errorMessage);
      addMessage("System", errorMessage);
    }

    setApiUrl("");
  };

  const addMessage = (sender: string, text: string | object) => {
    setMessages(prev => [...prev, { sender, text }]);
  };

  const parseQueryFilters = (url: string) => {
    const params = new URLSearchParams(url.split("?")[1]);
    return {
      testName: params.get("testName") || "",
      minAge: parseInt(params.get("minAge") || "0"),
      maxAge: parseInt(params.get("maxAge") || "0"),
      minWeight: parseInt(params.get("minWeight") || "0"),
      maxWeight: parseInt(params.get("maxWeight") || "0"),
      minHeight: parseInt(params.get("minHeight") || "0"),
      maxHeight: parseInt(params.get("maxHeight") || "0"),
      fromDate: params.get("fromDate") || "",
      toDate: params.get("toDate") || "",
      gender: params.get("gender") || "",
      state: params.get("state") || ""
    };
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleScroll = () => {
    const container = messagesContainerRef.current;
    if (!container) return;

    const isAtBottom =
      container.scrollHeight - container.scrollTop === container.clientHeight;
    setShowScrollButton(!isAtBottom);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="relative flex flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2 h-[calc(100vh-8rem)] md:h-[calc(100vh-13rem)]">
      <div
        className="flex overflow-y-auto p-4 rounded-t-lg bg-muted/50 flex-col gap-4 h-full overflow-x-hidden"
        onScroll={handleScroll}
        ref={messagesContainerRef}
      >
        {messages.map((msg, index) => (
          <Message
            key={index}
            sender={msg.sender}
            text={
              typeof msg.text === "object" ? (
                <pre>{JSON.stringify(msg.text, null, 2)}</pre>
              ) : (
                <span className="whitespace-pre-wrap">{msg.text}</span>
              )
            }
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {showScrollButton && (
        <Button
          onClick={scrollToBottom}
          className="fixed bottom-8 right-8 p-2 rounded-full shadow-md bg-primary flex items-center gap-1.5"
        >
          <ArrowDown className="size-3.5" />
          <span>Scroll to bottom</span>
        </Button>
      )}

      <form
        className="relative rounded-b-lg border bg-background focus-within:ring-1 focus-within:ring-ring"
        onSubmit={handleSubmit}
      >
        <Label htmlFor="message" className="sr-only">
          API URL
        </Label>
        <Textarea
          id="message"
          placeholder="Enter API URL here..."
          className="h-8 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
          value={apiUrl}
          onChange={e => setApiUrl(e.target.value)}
        />
        <div className="flex items-center p-3 pt-0">
          <Button type="submit" size="sm" className="ml-auto gap-1.5">
            Send
            <CornerDownLeft className="size-3.5" />
          </Button>
        </div>
      </form>

      {error && <div className="mt-2 text-red-500">{error}</div>}
    </div>
  );
};

export default Inspect;
