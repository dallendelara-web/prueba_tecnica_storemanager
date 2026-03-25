import { useState } from "react";
import type { InvalidInputAlertType } from '@/types/Components';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";

const InvalidInputAlert = ({
    Title,
    Description
}: InvalidInputAlertType)=>{
    return(
        <Alert variant="destructive">
            <AlertCircleIcon  />
            <AlertTitle>{Title ?? "Alerta"}</AlertTitle>
            <AlertDescription>
                {Description ?? ""}
            </AlertDescription>
        </Alert>
    );
}

export default InvalidInputAlert;