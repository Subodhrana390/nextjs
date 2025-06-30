import Link from "next/link";

const SidebarContent = ({ closeSidebar }) => (
  <nav className="flex flex-col gap-4 p-4">
    <Link
      href="/dashboard"
      className="text-sm font-medium hover:underline"
      onClick={closeSidebar}
    >
      Dashboard
    </Link>
    <Link
      href="/settings"
      className="text-sm font-medium hover:underline"
      onClick={closeSidebar}
    >
      Settings
    </Link>
    <Link
      href="/profile"
      className="text-sm font-medium hover:underline"
      onClick={closeSidebar}
    >
      Profile
    </Link>
  </nav>
);

export default SidebarContent;
