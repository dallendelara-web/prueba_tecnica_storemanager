import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { User, ChevronDown } from "lucide-react";
import { useAuth } from "@/Context/AuthContextUser";
import { useStore } from "@/store/useStore";
import { useNavigate } from "react-router";

export const UserProfileDropdown: React.FC = () => {
  const { user, logout: authLogout } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {

  }, [user]);

  if (!user) return null;

  return (
    <div className="flex justify-center  mb-3 relative w-full">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-2 p-2 w-full rounded-lg bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 hover:bg-primary/10 transition-colors">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
              {
                user?.image ?
                  <img className="w-10 h-10 rounded-full" src={user?.image} alt="Rounded avatar"></img>
                :
                  <User className="h-4 w-4" />
              }
              
            </div>
            <div className="flex flex-col text-left w-full">
              <span className="text-xs font-semibold leading-tight">
                {user?.firstName} {user?.lastName}
              </span>
              <span className="text-[10px] text-white leading-tight">
                {user?.email}
              </span>
            </div>
            <ChevronDown className="h-3 w-3 ml-auto text-muted-foreground" />
          </button>
        </DropdownMenuTrigger>
      </DropdownMenu>
    </div>
  );
};
