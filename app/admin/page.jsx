import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { currentUser } from "@clerk/nextjs/server";
import { Menu } from "lucide-react";
import { redirect } from "next/navigation";
import AdminSidebar from "./_component/AdminSidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import DashboardCard from "./_component/DashboardCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function AdminPage() {
  const user = await currentUser();

  if (!user) redirect("/auth/login");
  if (user && user.publicMetadata?.role !== "admin") {
    return redirect("/not-authorized");
  }

  return (
    <div className="min-h-screen w-full bg-gray-50">
      {/* Mobile Sidebar Trigger */}
      <div className="lg:hidden p-4 border-b">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[250px]">
            <AdminSidebar />
          </SheetContent>
        </Sheet>
      </div>

      <div className="flex">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block w-[250px] border-r min-h-screen bg-white">
          <AdminSidebar />
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src={user.imageUrl} />
                <AvatarFallback>
                  {user.firstName?.charAt(0)}
                  {user.lastName?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <span>
                {user.firstName} {user.lastName}
              </span>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <DashboardCard
              title="Total Users"
              value="1,234"
              description="+20.1% from last month"
            />
            <DashboardCard
              title="Revenue"
              value="$45,231"
              description="+12% from last month"
            />
            <DashboardCard
              title="Active Now"
              value="573"
              description="+201 since last hour"
            />
          </div>

          <div className="grid gap-4 mt-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                {/* Activity content would go here */}
                <div className="space-y-4">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>U{item}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">
                          User #{item} performed action
                        </p>
                        <p className="text-xs text-gray-500">2 hours ago</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline">Manage Users</Button>
                  <Button variant="outline">View Reports</Button>
                  <Button variant="outline">Settings</Button>
                  <Button variant="outline">Notifications</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
