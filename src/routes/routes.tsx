import { createBrowserRouter } from "react-router";
import Login from "../app/auth/Login";
import AuthLayout from "../app/auth/AuthLayout";

const router = createBrowserRouter([
  {
    path: "/auth",
    Component: AuthLayout,
    children: [
      { index: true, element: <Login /> },
    ],
  }
]);
export default router;
