import SidebarContent from "./SidebarContent";

const Sidebar = () => {
  return (
    <aside className="hidden md:flex md:w-64 h-full border-r">
      <SidebarContent />
    </aside>
  );
};

export default Sidebar;
