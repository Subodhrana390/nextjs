"use client";
import { useEffect, useState } from "react";
import { useUser, useSessionList } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Activity, Clock, User, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { formatDistanceToNow } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function DashboardPage() {
  const { isSignedIn, isLoaded, user } = useUser();
  const { sessions } = useSessionList();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isLoaded) return;

    if (!isSignedIn) {
      router.replace("/auth/login");
    } else {
      setLoading(false);
    }
  }, [isSignedIn, isLoaded, router]);

  if (!isLoaded || loading) {
    return (
      <div className="p-6 space-y-6">
        <Skeleton className="h-8 w-[200px]" />
        <div className="grid gap-6 md:grid-cols-2">
          <Skeleton className="h-[200px]" />
          <Skeleton className="h-[200px]" />
        </div>
      </div>
    );
  }

  if (!isSignedIn) return null;

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          Welcome, {user.firstName || user.username}
        </h1>
        <div className="flex items-center space-x-2">
          <Avatar>
            <AvatarImage src={user.imageUrl} />
            <AvatarFallback>
              {user.firstName?.charAt(0)}
              {user.lastName?.charAt(0)}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        {/* Current Session Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Current Session
            </CardTitle>
            <CardDescription>
              Information about your current login session
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {sessions.map((session) => (
              <div
                key={session.id}
                className="p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center justify-center p-2 rounded-full bg-primary/10">
                        <User className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">
                          {session.userAgent?.browser || "Unknown browser"} on{" "}
                          {session.userAgent?.os || "Unknown OS"}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {session.device?.ipAddress || "IP not available"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      <span className="text-muted-foreground">
                        Last active:{" "}
                        {session.lastActiveAt
                          ? formatDistanceToNow(
                              new Date(session.lastActiveAt),
                              {
                                addSuffix: true,
                              }
                            )
                          : "Unknown"}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col items-end">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {session.id === sessions[0].id ? "Current" : "Previous"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Recent Activity
            </CardTitle>
            <CardDescription>
              Your recent login sessions and activities
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {sessions && sessions.length > 0 ? (
              <>
                {sessions.slice(0, 3).map((s) => (
                  <div key={s.id} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">
                          {s.device?.browser || "Unknown browser"} on{" "}
                          {s.device?.os || "Unknown OS"}
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(s.lastActiveAt), {
                          addSuffix: true,
                        })}
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground ml-6">
                      {s.device?.ipAddress || "IP not available"}
                    </div>
                    <Separator />
                  </div>
                ))}
                <Button variant="ghost" className="w-full">
                  View all activity
                </Button>
              </>
            ) : (
              <Alert>
                <AlertDescription>No recent activity found.</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
