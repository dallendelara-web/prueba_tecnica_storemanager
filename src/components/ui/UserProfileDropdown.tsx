import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { User, ChevronDown, ShieldCheck, Building2, Car } from "lucide-react";
import { useAuth } from "@/Context/AuthContextUser";
import { useStore } from "@/store/useStore";
import { useNavigate } from "react-router";

interface AsignacionItem {
  _id?: string;
  descripcion: string;
  nombre?: string;
}

interface AsignacionDatos {
  concesionarios?: AsignacionItem[];
  marcas?: AsignacionItem[];
}

interface Perfil {
  _id?: string;
  nombre_perfil?: string;
}

export const UserProfileDropdown: React.FC = () => {
  const { user, logout: authLogout } = useAuth();
  const { logOut } = useStore();
  const navigate = useNavigate();

  const [asignacionDatos, setAsignacionDatos] = React.useState<AsignacionDatos | null>(null);
  const [perfilData, setPerfilData] = React.useState<Perfil | null>(null);

  React.useEffect(() => {
    const asignacionDatosStr = localStorage.getItem("asignacionDatos");
    if (asignacionDatosStr) {
      try {
        const datos = JSON.parse(asignacionDatosStr);
        setAsignacionDatos(datos);
      } catch (error) {
        console.error("Error al parsear asignacionDatos:", error);
      }
    }

    if (user?.id_perfil) {
      if (typeof user.id_perfil === "object") {
        setPerfilData(user.id_perfil);
      } else if (typeof user.id_perfil === "string") {
        const userStr = localStorage.getItem("user");
        if (userStr) {
          try {
            const userData = JSON.parse(userStr);
            if (userData.id_perfil && typeof userData.id_perfil === "object") {
              setPerfilData(userData.id_perfil);
            }
          } catch (error) {
            console.error("Error al parsear user:", error);
          }
        }
      }
    }
  }, [user]);

  if (!user) return null;

  return (
    <div className="flex justify-center px-3 mx-3 mb-3 relative z-[50]">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-2 p-2 w-full rounded-lg bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 hover:bg-primary/10 transition-colors">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <User className="h-4 w-4" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs font-semibold leading-tight">
                {user.name} {user.last_name}
              </span>
              <span className="text-[10px] text-muted-foreground leading-tight">
                {user.email}
              </span>
              {perfilData?.nombre_perfil && (
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[11px] font-medium">{perfilData.nombre_perfil}</span>
                <ShieldCheck className="h-2.5 w-2.5 text-primary" />
              </div>
            )}
            </div>
            <ChevronDown className="h-3 w-3 ml-auto text-muted-foreground" />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="start"
          className="w-64 mt-2 bg-card border border-border shadow-lg rounded-md animate-in fade-in slide-in-from-top-2 z-[9999]"
        >
          <DropdownMenuLabel className="text-xs uppercase tracking-wide text-muted-foreground">
            Perfil
          </DropdownMenuLabel>
          <div className="px-2 pb-2">
            {perfilData?.nombre_perfil && (
              <div className="flex items-center gap-2 mt-1">
                <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                <span className="text-[11px] font-medium">{perfilData.nombre_perfil}</span>
              </div>
            )}
          </div>

          {(asignacionDatos?.marcas?.length || asignacionDatos?.concesionarios?.length) && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuLabel className="text-xs uppercase tracking-wide text-muted-foreground">
                Asignaciones
              </DropdownMenuLabel>
              <div className="max-h-40 overflow-auto px-2 pb-2">
                {asignacionDatos.marcas?.length ? (
                  <div className="flex items-start gap-2 p-2 rounded-md bg-muted/30 mb-2">
                    <Car className="h-3.5 w-3.5 text-primary mt-0.5" />
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-semibold uppercase text-muted-foreground">
                        Marcas
                      </span>
                      {asignacionDatos.marcas.filter(marca => marca !== null && marca !== undefined).map((marca) => (
                        <span key={marca._id} className="text-[10px] leading-tight">
                          • {marca.nombre}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null}

                {asignacionDatos.concesionarios?.length ? (
                  <div className="flex items-start gap-2 p-2 rounded-md bg-muted/30">
                    <Building2 className="h-3.5 w-3.5 text-primary mt-0.5" />
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-semibold uppercase text-muted-foreground">
                        Concesionarios
                      </span>
                      {asignacionDatos.concesionarios.filter(c => c !== null && c !== undefined).map((c) => (
                        <span key={c._id} className="text-[10px] leading-tight">
                          • {c.nombre}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            </>
          )}

          <DropdownMenuSeparator />

          
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
