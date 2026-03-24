import { Outlet } from "react-router";
import logo from "../../assets/ecolana.webp";

const AuthLayout = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-[#003B5C] p-12">
        <img src={logo} alt="Mi logo" className="w-full h-auto" />
      </div>
      <div className="bg-white p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
