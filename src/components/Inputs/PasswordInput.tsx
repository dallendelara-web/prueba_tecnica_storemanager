import { useState } from "react";
import {
  TextField,
  IconButton,
  InputAdornment,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import type { PaswordInputType } from '@/types/Components';

const PasswordInput = ({
    Label,
    IsRequired,
    TxtError,
    Value,
    setValue,
    Variant
}: PaswordInputType)=>{
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return(
        <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label={Label ?? "Contraseña"}
            type={showPassword ? 'text' : 'password'}
            id={"password"+Value}
            autoComplete="current-password"
            variant={Variant ?? "outlined"}
            value={Value}
            onChange={(e) => setValue((e.target.value).trim())}
            InputProps={{
                endAdornment: (
                <InputAdornment position="end">
                    <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                    >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                </InputAdornment>
                ),
            }}
        />
    );
}

export default PasswordInput;