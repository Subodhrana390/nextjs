"use client";

import { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Switch } from "./ui/switch";
import { Button } from "./ui/button";

export default function SettingsPage() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [searchVisibility, setSearchVisibility] = useState(true);
  const [username, setUsername] = useState("johndoe");

  const handleSave = () => {
    alert("Settings saved");
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 space-y-8">
      <h2 className="text-2xl font-bold">Settings</h2>

      {/* Account Settings */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Account Information</h3>
        <div>
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
      </div>

      {/* Notification Settings */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Notifications</h3>
        <div className="flex items-center justify-between">
          <Label>Email Notifications</Label>
          <Switch
            checked={emailNotifications}
            onCheckedChange={setEmailNotifications}
          />
        </div>
      </div>

      {/* Privacy Settings */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Privacy</h3>
        <div className="flex items-center justify-between">
          <Label>Show Profile in Search</Label>
          <Switch
            checked={searchVisibility}
            onCheckedChange={setSearchVisibility}
          />
        </div>
      </div>

      {/* Theme */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Appearance</h3>
        <div className="flex items-center justify-between">
          <Label>Dark Mode</Label>
          <Switch checked={darkMode} onCheckedChange={setDarkMode} />
        </div>
      </div>

      <div cl assName="pt-4">
        <Button onClick={handleSave}>Save Settings</Button>
      </div>
    </div>
  );
}
