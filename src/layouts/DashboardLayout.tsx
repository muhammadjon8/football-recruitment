// DashboardLayout.jsx or .tsx
import { Outlet, useLocation } from "react-router-dom";
import { AccountBox, Home, SettingsApplications } from "@mui/icons-material";
import Sidebar, { SidebarItem } from "../modules/sidebar";

export default function DashboardLayout() {
  const location = useLocation();

  return (
    <div className="flex">
      <Sidebar>
        <SidebarItem
          text="Candidate"
          icon={<AccountBox />}
          active={location.pathname === "/candidate"}
          alert={true}
          href="/candidate"
        />
        <SidebarItem
          text="Home"
          icon={<Home />}
          active={location.pathname === "/home"}
          alert={false}
          href="/home"
        />
        <SidebarItem
          text="Application"
          icon={<SettingsApplications />}
          active={location.pathname === "/applications"}
          alert={false}
          href="/applications"
        />
      </Sidebar>

      <main className="flex-1 p-4 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
