import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "./ui/sidebar";

import logo from "@/assets/AppInicio_residuos.webp";

import { useLocation, useNavigate } from "react-router";
import { getSidebarRoutes } from "@/constants/SidebarRoutes";
import { useAuth } from "../Context/AuthContextUser";
import { LogOut } from "lucide-react";
import { UserProfileDropdown } from "@/components/ui/UserProfileDropdown";


/**Gestiona que ruta se marca como activa */
const handleRoutes = (menuData: ReturnType<typeof getSidebarRoutes>, currentPath: string) => {
  return {
    ...menuData,
    navMain: menuData.navMain.map((section) => ({
      ...section,
      items: section.items.map((item) => ({
        ...item,
        isActive: item.path === currentPath,
      })),
    })),
  };
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const location = useLocation();
  const [menuData, setMenuData] = React.useState(() => getSidebarRoutes());
  const navigate = useNavigate();
  //const { logOut } = useStore();
  const { logout: authLogout, user } = useAuth();

  React.useEffect(() => {

  }, [user]);

  React.useEffect(() => {
    // Actualizar el menú cuando cambie la ruta o el usuario
    const sidebarRoutes = getSidebarRoutes();
    const newMenu = handleRoutes(sidebarRoutes, location.pathname);
    setMenuData(newMenu);
  }, [location, user]);

  const handleLogout = () => {
    // Hacer logout del contexto de autenticación
    authLogout();

    // Usar setTimeout para asegurar que el estado se actualice antes de navegar
    setTimeout(() => {
      navigate('/auth');
    }, 0);
  };

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <div className="flex flex-col items-center gap-2 p-3">
          <img src={logo} alt="Mi logo" className="w-[50%] h-auto" />
          <span className="text-lg text-muted text-center">Storage Manager</span>
        </div>
        <UserProfileDropdown />
      </SidebarHeader>
      <SidebarContent>
        {menuData.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={item.isActive}
                      onClick={() => navigate(item.path)}
                    >
                      <div className="flex items-center gap-x-4">
                        {item.icon && <item.icon />}
                        <a href={item.url}>{item.title}</a>
                      </div>
                    </SidebarMenuButton>
                    {/* submenu */}
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={handleLogout}>
              <div className="flex items-center gap-x-4">
                <LogOut />
                <span>Cerrar Sesión</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
