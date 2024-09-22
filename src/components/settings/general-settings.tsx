import React, { useState, useEffect } from "react";
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
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext/AuthContextUser";

const isImageUrl = (url: string) => {
  return /\.(jpg|jpeg|png|gif|bmp|webp|svg)$/.test(url);
};

const GeneralSettings = () => {
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

    if (url && isImageUrl(url)) {
      setProfilePicUrl(url);
      setMessage(null);
    } else {
      setMessage({
        text: "Please enter a valid image URL (jpg, jpeg, png, gif, bmp, webp, svg).",
        type: "error"
      });
    }
  };

  const handleSave = async () => {
    if (storeName && profilePicUrl) {
      try {
        updateUserInfo(storeName, profilePicUrl);
        setMessage({ text: "Settings updated successfully!", type: "success" });
      } catch (error) {
        setMessage({
          text: "Failed to update settings. Please try again.",
          type: "error"
        });
        console.log(error);
      } finally {
        setTimeout(() => setMessage(null), 3000);
      }
    } else {
      setMessage({
        text: "User name and profile picture URL cannot be empty.",
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
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="storeName">User Name</Label>
            <Input
              id="storeName"
              value={storeName}
              onChange={e => setStoreName(e.target.value)}
              placeholder="Store Name"
            />
          </div>

          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="profilePicUrl">Profile Picture URL</Label>
            <Input
              id="profilePicUrl"
              value={profilePicUrl || ""}
              onChange={handleProfilePicChange}
              placeholder="Enter image URL"
            />
            <p className="text-gray-500 text-sm min-w-max">
              Please enter a valid image URL (like
              https://example.com/image.jpg).
            </p>
          </div>

          {profilePicUrl && (
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
        {message && (
          <p
            className={`mt-2 text-sm ${message.type === "success" ? "text-green-500" : "text-red-500"}`}
          >
            {message.text}
          </p>
        )}
      </CardFooter>
    </Card>
  );
};

export default GeneralSettings;
