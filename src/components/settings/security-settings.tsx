import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext/AuthContextUser";
import Message from "./message";

const SecuritySettings: React.FC = () => {
  const { user, updateEmail } = useAuth();
  const [newEmail, setNewEmail] = useState<string>("");
  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error" | null;
  } | null>(null);

  useEffect(() => {
    if (user) {
      setNewEmail(user.email);
    }
  }, [user]);

  const handleEmailUpdate = async () => {
    if (!newEmail) {
      setMessage({ text: "Email cannot be empty.", type: "error" });
      return;
    }

    try {
      await updateEmail(newEmail);
      setMessage({ text: "Email updated successfully!", type: "success" });
    } catch (error) {
      setMessage({
        text: "Failed to update email. Please try again.",
        type: "error"
      });
      console.error(error);
    } finally {
      setTimeout(() => setMessage(null), 3000);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Security Settings</CardTitle>
        <CardDescription>Update your email address here.</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-4">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Input
              placeholder="Email"
              value={newEmail}
              onChange={e => setNewEmail(e.target.value)}
              type="email"
            />
          </div>
        </form>
      </CardContent>
      <CardFooter className="border-t px-6 py-4 flex items-center justify-between">
        <Button onClick={handleEmailUpdate}>Update Email</Button>
        {message && <Message text={message.text} type={message.type} />}
      </CardFooter>
    </Card>
  );
};

export default SecuritySettings;
