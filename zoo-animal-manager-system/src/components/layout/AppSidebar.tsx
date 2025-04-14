
import { Home, Landmark, ShieldPlus, BarChart4 } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const AppSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", path: "/", icon: Home },
    { name: "Animals", path: "/animals", icon: Landmark },
    { name: "Care", path: "/care", icon: ShieldPlus },
    { name: "Statistics", path: "/statistics", icon: BarChart4 },
  ];

  return (
    <div className="bg-sidebar p-4 min-h-screen w-64 text-sidebar-foreground">
      <div className="flex items-center justify-center mb-10 pt-4">
        <h1 className="text-2xl font-bold">Zoo Manager</h1>
      </div>
      <nav>
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.name}>
              <button
                onClick={() => navigate(item.path)}
                className={cn(
                  "flex items-center w-full p-3 rounded-md hover:bg-sidebar-accent transition-colors",
                  location.pathname === item.path && "bg-sidebar-accent"
                )}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default AppSidebar;
