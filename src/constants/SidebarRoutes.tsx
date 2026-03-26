import {
  PackageOpen,
  ShoppingCart,
} from "lucide-react";

export const getSidebarRoutes = () => {
  return {
    navMain: [
      {
        title: "PRINCIPAL",
        url: "#",
        items: [
          {
            title: "Productos",
            url: "#",
            icon: PackageOpen,
            path: "/",
            isActive: false,
          },
        ],
      },
      {
        title: "USUARIOS",
        url: "#",
        items: [
          {
            title: "Carritos",
            url: "#",
            icon: ShoppingCart,
            path: "/users/carts",
            isActive: false,
          }
        ],
      },
    ],
  };
};

// Mantener la estructura anterior para compatibilidad (será deprecada)
export const sidebarRoutes = getSidebarRoutes();