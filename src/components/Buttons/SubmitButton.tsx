import { useState } from "react";
import { LockIcon, LockOpenIcon } from "lucide-react";
import type { SubmitButtonType } from "@/types/Components"
import {
  Button,
} from '@mui/material';

import "./styles.css"

const SubmitButton = ({
    OnSubmit,
    Label,
    IsDisabled
}: SubmitButtonType)=>{
    return(
        <Button
            className={IsDisabled ? "submit-button sb-disabled" : "submit-button"}
            //type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 8, mb: 2 }}
            color="secondary"
            disabled={IsDisabled}
            startIcon={IsDisabled ? <LockIcon /> : <LockOpenIcon />}
            onClick={OnSubmit}
        >
            {Label ?? "OK"}
        </Button>
    );
}

export default SubmitButton;