import { useState } from "react";
import { LockIcon, LockOpenIcon, PackageSearch } from "lucide-react";
import type { SubmitButtonType } from "@/types/Components"
import {
  Button,
} from '@mui/material';

import "./styles.css"

const DetailsButton = ({
    OnSubmit,
    Label,
    IsDisabled,
    marginTop,
    small
}: SubmitButtonType)=>{
    return(
        <Button
            className={IsDisabled ? "submit-button sb-disabled" : "submit-button"}
            //type="submit"
            fullWidth={small ? false : true}
            variant="contained"
            sx={{ mt: {marginTop} }}
            color="secondary"
            disabled={IsDisabled}
            startIcon={<PackageSearch />}
            onClick={OnSubmit}
        >
            {Label ?? "OK"}
        </Button>
    );
}

export default DetailsButton;