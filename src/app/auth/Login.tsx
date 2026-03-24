import { useNavigate } from "react-router";
import React, { useRef, useEffect } from 'react';
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon, CheckCircle2Icon, CircleX, Eye, EyeOff  } from "lucide-react";
import { useAuth } from "../../Context/AuthContextUser";

import { useState } from "react";

interface LoginData {
  user: string;
  password: string;
}

const Login = () => {
  const { login, user } = useAuth();
  const navigate = useNavigate();

  const [validFields, setValidFields] = useState(true);
  const [validFieldP, setValidFieldP] = useState(true);
  const [seePasword, setSeePasword] = useState(false);
  const [isEmail, setIsEmail] = useState(true);
  const [isPassword, setIsPassword] = useState(true);
  const [isRPok, setIsRPok] = useState(true);

  const emailInput = useRef<HTMLInputElement> (null);
  const pswInput = useRef<HTMLInputElement> (null);

  useEffect(() => {
    user?._id ? handleNavigate("/") : null;
  }, [user]);


  const [loginData, setLoginData] = useState<LoginData>({
    user: "",
    password: "",
  });

  const handleNavigate = (route: string): void => {
    navigate(route);
  };

  const handleLogin = (loginData: LoginData) => {
    
  };

  const handleRecoverPassw = (loginData: LoginData) => {
    
  };

  const handleValidateFields = () => {
    let valid = true;
    if(loginData.user == "" || loginData.user == null || loginData.user == undefined){
      valid = false;
      setIsEmail(false);
      emailInput.current.focus();
    }
    else if(loginData.password == "" || loginData.password == null || loginData.password == undefined){
      valid = false;
      setIsPassword(false);
      pswInput.current.focus();
    }

    valid ? handleLogin(loginData) : setValidFields(false);
  }

  const handleValidateFieldsRecoverPsw = () => {

  }
  
  return (
    <div className="flex flex-col items-center justify-center h-screen p-12 gap-y-4">
      <h6 className="text-xl font-bold">Iniciar Sesión</h6>
      <span className="text-muted-foreground text-sm">
        Ingresa tu correo para acceder
      </span>
      <Input
        placeholder="Correo Electrónico *"
        value={loginData.user}
        ref={emailInput}
        onChange={(e) => {
          
        }}
        className={`${isEmail ? '' : 'focus:ring-red-500'}`}
      />
      <div className="relative w-full flex items-center">
        <Input
          className="pr-10 pl-4 py-2 border rounded-md focus:outline-none focus:ring-2 w-full"
          placeholder="Contraseña *"
          type={seePasword ? "" : "password"}
          value={loginData.password}
          ref={pswInput}
          onChange={(e) =>{
            setLoginData({ ...loginData, password: (e.target.value).trim() });
            setValidFields(true)
          }}
        />
        <div className="absolute right-3">
          {
            seePasword ?
              <EyeOff onClick={() => setSeePasword(false)} color="#003B5C" />
            :
              <Eye onClick={() => setSeePasword(true)} color="#003B5C" />
          }
        </div>
      </div>
      {
        validFields ? 
          null
        :
          <Alert variant="destructive">
            <AlertCircleIcon  />
            <AlertTitle>Campo vacío</AlertTitle>
            <AlertDescription>
              Ingrese todos los datos solicitados.
            </AlertDescription>
          </Alert>
      }
      {
        validFieldP ? 
          null
        :
          <Alert variant="destructive">
            <AlertCircleIcon  />
            <AlertTitle>E-mail inválido</AlertTitle>
            <AlertDescription>
              Es necesario ingresar su correo electrónico correctamente
            </AlertDescription>
          </Alert>
      }
      {
        isRPok ? 
          null
        :
          <Alert variant="destructive">
            <CircleX  />
            <AlertTitle>El usuario no existe o no se encuentra activo.</AlertTitle>
            <AlertDescription>
              Verifique nuevamente su correo.
            </AlertDescription>
          </Alert>
      }
      <Button
        className="w-full"
        size={"lg"}
        type="button"
      >
        Iniciar sesión
      </Button>
      <Button
        className="w-full"
        size={"lg"}
        variant={"secondary"}
        onClick={() => handleNavigate("/auth/register")}
      >
        Registrarse
      </Button>
      <Button className="w-full" size={"lg"} variant={"ghost"} onClick={handleValidateFieldsRecoverPsw}>
        Olvide mi contraseña
      </Button>
    </div>
  );
};

export default Login;
