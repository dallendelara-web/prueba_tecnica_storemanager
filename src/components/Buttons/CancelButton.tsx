import { useState } from "react";
import { LockIcon, LockOpenIcon, XCircle } from "lucide-react";
import type { SubmitButtonType } from "@/types/Components"
import {
  Button,
} from '@mui/material';

import "./styles.css"

const SubmitButton = ({
    OnSubmit,
    Label,
    IsDisabled,
    marginTop,
    small
}: SubmitButtonType)=>{
    return(
        <Button
            className={IsDisabled ? "cancel-button sb-disabled" : "cancel-button"}
            fullWidth={small ? false : true}
            variant="contained"
            sx={{ mt: {marginTop}, mb: 2 }}
            color="secondary"
            disabled={IsDisabled}
            startIcon={<XCircle />}
            onClick={OnSubmit}
        >
            {Label ?? "OK"}
        </Button>
    );
}

export default SubmitButton;