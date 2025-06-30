"use client";

import { useState, useEffect } from "react";
import { useUser, useClerk } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function ProfilePage() {
  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (isLoaded && user) {
      setFullName(user.fullName || "");
      setEmail(user.primaryEmailAddress?.emailAddress || "");
      setMobile(user.phoneNumbers?.[0]?.phoneNumber || "");
    }
  }, [isLoaded, user]);

  const handleUpdateProfile = async () => {
    try {
      const [firstName, lastName = ""] = fullName.trim().split(" ");
      await user.update({ firstName, lastName });

      if (mobile && mobile !== user.phoneNumbers?.[0]?.phoneNumber) {
        const phone = user.phoneNumbers?.[0];

        if (phone) {
          await phone.update({ phoneNumber: mobile });
          toast.success("Mobile updated.");
        } else {
          const newPhone = await user.createPhoneNumber({
            phoneNumber: mobile,
          });
          await newPhone.setPrimary();
          await newPhone.prepareVerification({ strategy: "phone_code" });
          toast("Phone added. Verification required.");
        }
      }

      toast.success("Profile updated!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile.");
    }
  };

  const handleUpdatePassword = async () => {
    if (password !== confirmPassword) {
      return toast.error("Passwords do not match!");
    }

    try {
      if (!user.passwordEnabled) {
        return toast.error(
          "Password change not supported for social accounts."
        );
      }

      await user.updatePassword({ newPassword: password });
      toast.success("Password updated.");
    } catch (err) {
      console.error(err);
      toast.error("Password update failed.");
    }
  };

  const handlePhotoChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      return toast.error("Please select a valid image file.");
    }

    try {
      await user.setProfileImage({ file });
      toast.success("Profile photo updated.");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update photo.");
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await user.delete();
      await signOut();
      toast("Account deleted.");
    } catch (err) {
      console.error(err);
      if (
        err.errors?.[0]?.code === "session_reverification_required" ||
        err.code === "session_reverification_required"
      ) {
        toast.error("Please re-authenticate to delete your account.");
        // Redirect to sign-in with redirect back to profile
        window.location.href = "/sign-in?redirect_url=/profile";
      } else {
        toast.error("Failed to delete account.");
      }
    }
  };

  if (!isLoaded) return <div className="text-center mt-10">Loading...</div>;

  const canEditPassword = user?.passwordEnabled;
  const canEditPhone = !!user?.createPhoneNumber;

  return (
    <div className="max-w-md mx-auto mt-10 space-y-8">
      <div className="text-center space-y-2">
        <Avatar className="w-24 h-24 mx-auto">
          <AvatarImage src={user.imageUrl} alt="Profile" />
          <AvatarFallback>
            {user.firstName?.[0]}
            {user.lastName?.[0]}
          </AvatarFallback>
        </Avatar>

        <div>
          <Input
            id="profilePhoto"
            type="file"
            accept="image/*"
            className="cursor-pointer text-sm"
            onChange={handlePhotoChange}
          />
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" value={email} disabled />
        </div>

        <div>
          <Label htmlFor="mobile">Mobile Number</Label>
          <Input
            id="mobile"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            disabled={!canEditPhone}
          />
          {!canEditPhone && (
            <p className="text-sm text-muted-foreground">
              Updating mobile number is not available for this account type.
            </p>
          )}
        </div>

        <Button onClick={handleUpdateProfile}>Update Profile</Button>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Change Password</h3>

        <div>
          <Label htmlFor="password">New Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={!canEditPassword}
          />
        </div>

        <div>
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={!canEditPassword}
          />
        </div>

        <Button onClick={handleUpdatePassword} disabled={!canEditPassword}>
          Update Password
        </Button>

        {!canEditPassword && (
          <p className="text-sm text-muted-foreground">
            Password update is disabled for accounts created with social login.
          </p>
        )}
      </div>

      <div className="pt-6">
        <Button variant="destructive" onClick={handleDeleteAccount}>
          Delete Account
        </Button>
      </div>
    </div>
  );
}
