import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext/AuthContextUser";
import Message from "./message";
import InputField from "./input-field";
import { isValidImageURL } from "@/lib/utils";

const GeneralSettings: React.FC = () => {
  const { user, updateUserInfo } = useAuth();
  const [storeName, setStoreName] = useState(user?.name || "");
  const [profilePicUrl, setProfilePicUrl] = useState<string | null>(
    user?.picture || null
  );
  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error" | null;
  } | null>(null);

  useEffect(() => {
    setStoreName(user?.name || "");
    setProfilePicUrl(user?.picture || null);
  }, [user]);

  const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setProfilePicUrl(url);
    setMessage(null);

    if (url && !isValidImageURL(url)) {
      setMessage({
        text: "Please enter a valid image URL (jpg, jpeg, png, gif, bmp, webp, svg).",
        type: "error"
      });
    }
  };

  const handleSave = async () => {
    if (storeName && profilePicUrl && isValidImageURL(profilePicUrl)) {
      try {
        await updateUserInfo(storeName, profilePicUrl);
        setMessage({ text: "Settings updated successfully!", type: "success" });
      } catch (error) {
        console.error(error);
        setMessage({
          text: "Failed to update settings. Please try again.",
          type: "error"
        });
      } finally {
        setTimeout(() => setMessage(null), 3000);
      }
    } else {
      setMessage({
        text: "User name and profile picture URL cannot be empty or invalid.",
        type: "error"
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>General Settings</CardTitle>
        <CardDescription>
          Update your user name and profile picture.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-6">
          <InputField
            id="storeName"
            label="User Name"
            value={storeName}
            onChange={e => setStoreName(e.target.value)}
            placeholder="User Name"
          />
          <InputField
            id="profilePicUrl"
            label="Profile Picture URL"
            value={profilePicUrl || ""}
            onChange={handleProfilePicChange}
            placeholder="Enter image URL"
            helperText="Please enter a valid image URL (like https://example.com/image.jpg)."
          />
          {profilePicUrl && isValidImageURL(profilePicUrl) && (
            <img
              src={profilePicUrl}
              alt="Profile Preview"
              className="mt-4 w-24 h-24 rounded-full object-cover border-black border-2"
            />
          )}
        </form>
      </CardContent>
      <CardFooter className="border-t px-6 py-4 flex items-center justify-between">
        <Button onClick={handleSave}>Update Details</Button>
        {message && <Message text={message.text} type={message.type} />}
      </CardFooter>
    </Card>
  );
};

export default GeneralSettings;
