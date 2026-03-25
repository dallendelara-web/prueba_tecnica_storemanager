import { useNavigate } from "react-router";
import React, { useRef, useEffect } from 'react';
import { useState } from "react";
import { AnimatePresence, motion } from 'framer-motion';

import "./styles.css"
import userLogin from '@/assets/ecolana-white.png';
import {
  TextField,
  Box
} from '@mui/material';
import type { LoginType } from '@/types/User';
import  PasswordInput from '@/components/Inputs/PasswordInput';
import  SubmitButton from '@/components/Buttons/SubmitButton';
import { IsEmpty } from '@/helpers/ValidateValue';

const LoginForms = ()=> {

    const [formDataLogin, setFormDataLogin] = useState<LoginType>({
        username: '',
        password: '',
    });
    const [isDisabled, setIsDisabled] = useState(true);
    const [errors, setErrors] = useState<{ [key: string]: boolean }>({});

    useEffect(() => {
        const res = validateFields();
        !res ? setIsDisabled(true) : setIsDisabled(false);
    }, [formDataLogin]);

    const validateFields = () => {
        const newErrors: { [key: string]: boolean } = {};

        if (IsEmpty(formDataLogin.username.trim())) newErrors.username = true;
        if (IsEmpty(formDataLogin.password.trim())) newErrors.password = true;

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };


    const handleLogin = ()=> {

    }

    return(
        <div className="flex flex-col h-screen p-12 gap-y-4">
            <div className="flex flex-col items-center p-12 w-full h-[90%] login-containter">
                <div style={{display: "grid", placeItems:"center"}}>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={"icon-user"}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                        >
                            <img
                                src={userLogin}
                                className="user-login"
                            />
                        </motion.div>
                    </AnimatePresence>
                </div>
                <Box 
                    className="w-full flex flex-col items-center"
                    component="form" 
                    sx={{ mt: 5 }}
                >
                    <h6 className="text-xl font-bold text-[#000000]">Iniciar Sesión</h6>
                    <span className="text-muted-foreground text-sm text-white">
                        Ingrese sus credenciales de acceso
                    </span>
                </Box>
                <Box 
                    className="w-full"
                    component="form" 
                    sx={{ mt: 5 }}
                >
                    <TextField
                        required
                        fullWidth
                        variant="filled"
                        id="username"
                        label="Nombre de usuario"
                        name="username"
                        autoComplete="email"
                        autoFocus
                        value={formDataLogin.username}
                        onChange={(e) => setFormDataLogin({ ...formDataLogin, username: e.target.value })}
                    />
                    <PasswordInput
                        Variant="filled"
                        Label="Contraseña"
                        Value={formDataLogin.password}
                        setValue={(e) => setFormDataLogin({ ...formDataLogin, password: e })}
                    />
                    <SubmitButton
                        OnSubmit={handleLogin}
                        Label={"Entrar"}
                        IsDisabled={isDisabled}
                    />
                </Box>
            </div>
        </div>
    );
}

export default LoginForms;