import { createBrowserRouter } from "react-router";

import PrivateRoute from "./routerComponents/PrivateRoute";
import LogIn from "@/app/auth/LoginPage";
import AuthLayout from "@/layouts/AuthLayout";
import HomePage from "@/app/main/HomePage";

const router = createBrowserRouter([
  // ------- EJEMPLO DE LA DEFINICIÓN DE RUTAS CON REACT ROUTER v6
  /*{
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/auth",
        element: <Login />,
      },
    ],
  },*/
  
  // ------- ESTE PROYECTO ESTÁ HECHO CON REACT ROUTER v7
  {
    path: "/auth",
    Component: AuthLayout,
    children: [
      { 
        index: true, 
        element: <LogIn /> 
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      { 
        index: true, 
        element: (
        <PrivateRoute>
          <HomePage />
        </PrivateRoute>
      ) 
      },
      //{ path: "/admin/perfiles", element: (<PrivateRoute><GestionPerfiles /></PrivateRoute>) },
    ],
  },
]);

export default router;
