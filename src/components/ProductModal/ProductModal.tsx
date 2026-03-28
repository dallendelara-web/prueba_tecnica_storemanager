
import { useNavigate } from "react-router";
import React, { useRef, useEffect } from 'react';
import { useState } from "react";
import { useStore } from "@/store/useStore";
import { useAuth } from "@/Context/AuthContextUser";
import Swal from 'sweetalert2';
import Alert from '@mui/material/Alert';

import { useProductSaved } from "@/Context/ProductSavedContext";

import {
  TextField,
  IconButton,
  InputAdornment,
  Modal,
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Autocomplete,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Switch,
  Badge
} from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import {
  ExpandMore as ExpandMoreIcon,
  PostAdd
} from '@mui/icons-material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import InventoryIcon from '@mui/icons-material/Inventory';
import SubmitButton from '@/components/Buttons/SubmitButton';
import CancelButton from '@/components/Buttons/CancelButton';
import FlagCircleIcon from '@mui/icons-material/FlagCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import ChecklistIcon from '@mui/icons-material/Checklist';
import PercentIcon from '@mui/icons-material/Percent';
import InfoIcon from '@mui/icons-material/Info';
import { IsEmpty } from '@/helpers/ValidateValue';

import { 
    Plus,
    Filter,
    ArrowUpWideNarrow,
} from "lucide-react";

import type {modalType} from "@/types/Components"
import useMediaQuery from '@mui/material/useMediaQuery';
import type { TransitionProps } from '@mui/material/transitions';
import Slide from '@mui/material/Slide';
import { AnimatePresence, motion } from 'framer-motion';
import type { ProductsData } from '@/types/Products';
import  InvalidInputAlert from '@/components/Alerts/InvalidInputAlert';
import  SimpleList from '@/components/List/SimpleList';

import { nombreProducto, precioProducto, stockProducto, descuentoProducto } from "@/helpers/TextFormats"

const ProductModal = ({
    open,
    setOpen
}: modalType)=> {
    const { user } = useAuth();
    const { 
        saveProduct, 
        nombre: nombreStorage,
        categoria: categoriaStorage,
        precioBase: precioStorage,
        stockTotal: stockStorage,
        descuento: descuentoStorage,
        disponiblidad: disponibilidadStorage,
        rating: ratingStorage,
        variantes: variantesStorage
    } = useProductSaved();

    const [formDataProduct, setFormDataProduct] = useState<ProductsData>({
        nombre: "",
        categoria: "",
        precioBase: 0,
        stockTotal: 0,
        descuento: 0,
        disponiblidad: "En venta",
        rating: 0,
        variantes: []
    });

    const [formDataVariantProduct, setFormDataVariantProduct] = useState({
        nombre: "",
        precioBase: null,
        stockTotal: null,
    });

    const { getCategoriesProducts, getCategoriesProductsSuccess, isLoadingGetCategoriesProducts } = useStore();
    const { createProducts, createProductSuccess, isLoadingCreateProduct } = useStore();
  
    const [expandedAccordion, setExpandedAccordion] = useState<string | false>('panel0');
    const handleAccordionChange = (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpandedAccordion(isExpanded ? panel : false);
    };
    const [isDisabled, setIsDisabled] = useState(true);
    const [checked, setChecked] = React.useState(true);
    const [errors, setErrors] = useState<{ [key: string]: boolean }>({});
    const [errorsVariables, setErrorsVariables] = useState<{ [key: string]: boolean }>({});
    const [categoriesList, setCategoriesList] = useState([]);
    const [isOk, setIsOk] = useState(false);

    const [openChildModal, setOpenChildModal] = React.useState(false);
    const handleCloseChild = () => { setOpenChildModal(false); };

    const [openSnackBar, setOpenSnackBar] = React.useState(false);
    const handleCloseSnackBar = () => { setOpenSnackBar(false); };

    const timerRef = useRef(null);
    const dataRef = useRef(formDataProduct);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
        event.target.checked ? setFormDataProduct({ ...formDataProduct, disponiblidad: "En venta" }) : setFormDataProduct({ ...formDataProduct, disponiblidad: "Descontinuado" })
    };

    useEffect(() => {
        if(user?.id && open){
            console.log("nombreStorage")
            console.log(nombreStorage)
            setFormDataProduct({
                nombre: nombreStorage,
                categoria: categoriaStorage,
                precioBase: precioStorage,
                stockTotal: stockStorage,
                descuento: descuentoStorage,
                disponiblidad: disponibilidadStorage ?? "En venta",
                rating: ratingStorage,
                variantes: variantesStorage ?? []
            })
            getCategoriesProducts();
            startAutoSave();
        }else{
            if (timerRef.current) {
                clearInterval(timerRef.current);
                timerRef.current = null;
            }
        }
    }, [open]);

    useEffect(() => {
        if(getCategoriesProductsSuccess?.data?.length > 0){
            setCategoriesList(getCategoriesProductsSuccess?.data);
        }else{
            setCategoriesList([]);
        }
    }, [getCategoriesProductsSuccess]);

    useEffect(() => {
        handleIsDisabled();
    }, [formDataProduct]);
    
    
    const handleClose = () => {
        setOpen(false);
        setOpenChildModal(false);
    };

    const validateFields = (field: string, value: any)=>{
        if(field == "name"){
            const res = nombreProducto(value);
            res ? setFormDataProduct({ ...formDataProduct, nombre: value }) : null;
            return res ? null : setIsDisabled(true);
        }
        if(field == "precioBase"){
            setIsDisabled(true)
            const res = precioProducto(value);
            res ? setFormDataProduct({ ...formDataProduct, precioBase: value }) : null;
            return res ? null : setIsDisabled(true);
        }
        if(field == "stockTotal"){
            setIsDisabled(true)
            const res = stockProducto(value);
            res ? setFormDataProduct({ ...formDataProduct, stockTotal: value }) : null;
            return res ? null : setIsDisabled(true);
        }
        if(field == "descuento"){
            setIsDisabled(true)
            const res = descuentoProducto(value);
            res ? setFormDataProduct({ ...formDataProduct, descuento: value }) : null;
            return res ? null : setIsDisabled(true);
        }
    }

    const validateVariantFields = (field: string, value: any)=>{
        if(field == "name"){
            const res = nombreProducto(value);
            res ? setFormDataVariantProduct({ ...formDataVariantProduct, nombre: value }) : null;
        }
        if(field == "precioBase"){
            const res = precioProducto(value);
            if (!res) return null;

            if((Number(value) <= (Number(formDataProduct.precioBase) * 3)) || value==""){
                setFormDataVariantProduct({ ...formDataVariantProduct, precioBase: value })
            }else{
                return null;
            }
        }
        if(field == "stockTotal"){
            const res = stockProducto(value);
            if (!res) return null;

            if(Number(value) > Number(formDataProduct.stockTotal)){
                return;
            }else{
                console.log(formDataProduct.stockTotal)
                console.log(value)
                setFormDataVariantProduct({ ...formDataVariantProduct, stockTotal: value })
            }
        }
    }

    const validateFieldsEmpty = (showErrors: boolean)=>{
        const newErrors: { [key: string]: boolean } = {};
        let status = false;

        if(IsEmpty(formDataProduct.nombre)){
            status = true;
            newErrors.name = true;
        }
        if(IsEmpty(formDataProduct.precioBase) || formDataProduct.precioBase == 0){
            status = true;
            newErrors.precioBase = true;
        }
        if(IsEmpty(formDataProduct.stockTotal) || formDataProduct.stockTotal == 0){
            status = true;
            newErrors.stock = true;
        }
        if(IsEmpty(formDataProduct.categoria)){
            status = true;
            newErrors.categoria = true;
        }
        if(IsEmpty(formDataProduct.disponiblidad)){
            status = true;
            newErrors.disponiblidad = true;
        }

        showErrors ? setErrors(newErrors): null;
        return status;
    }

    const sumaVariantsStock = formDataProduct?.variantes?.reduce((acumulador, v) => acumulador + v.stockTotal, 0);

    const validateFieldsVariantEmpty = async ()=>{
        const newErrors: { [key: string]: boolean } = {};
        let res = false;

        if(IsEmpty(formDataVariantProduct.nombre)){
            newErrors.name = true;
            res = true;
        }
        if(IsEmpty(formDataVariantProduct.precioBase) || formDataVariantProduct.precioBase == 0 || Number(formDataVariantProduct.precioBase < Number(formDataProduct.precioBase))){
            newErrors.precioBase = true;
            res = true;
        }
        if(IsEmpty(formDataVariantProduct.stockTotal) || formDataVariantProduct.stockTotal == 0 || ( Number(formDataVariantProduct.stockTotal) + Number(sumaVariantsStock) ) > Number(formDataProduct.stockTotal)){
            newErrors.stock = true;
            res = true;
        }

        setErrorsVariables(newErrors);
        return res;
    }

    const handleAddVariant = async()=>{
        if (await validateFieldsVariantEmpty()) {
            return;
        }
  
        const result = [
            ...formDataProduct.variantes,
            formDataVariantProduct
        ]
        setFormDataProduct({ ...formDataProduct, variantes: result });
        setFormDataVariantProduct({
            nombre: "",
            precioBase: 0,
            stockTotal: 0,
        });
    }

    const handleIsDisabled = ()=>{
        const response = validateFieldsEmpty(false);
        console.log("FORM")
        console.log(response);
        response ? setIsDisabled(true) : setIsDisabled(false);
    }

    const handleCreateProduct = async ()=>{
        const response = await createProducts();
        if(response?.success){
            handleClose();
            Toast.fire({
                icon: "success",
                title: "Producto creado exitosamente"
            });
        }else{
            handleClose();
            Toast.fire({
                icon: "error",
                title: "El producto no se pudo cancelar"
            });
        }
    }

    const handleCancel = ()=>{
        setOpenChildModal(true);
    }

    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 5000,
        timerProgressBar: true,
        didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
        }
    });

    const startAutoSave = () => {
        // Solo iniciamos si no hay un timer corriendo
        if (!timerRef.current) {
            console.log("Auto-guardado iniciado (Primer clic)");
            
            timerRef.current = setInterval(() => {
                saveProduct(dataRef.current);
                setOpenSnackBar(true);
                setIsOk(true);
            }, 30000); // 30 segundos
        }
    };

    useEffect(() => {
        dataRef.current = formDataProduct;
    }, [formDataProduct]);

    return(
        <AnimatePresence mode="wait">
            <motion.div
                key={"product-modal"}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
            >
                <Dialog 
                    open={open} 
                    onClose={() => {}}
                    fullWidth
                    maxWidth={"md"}
                    scroll="paper"
                    disableEscapeKeyDown 
                    disableEnforceFocus
                >
                    <DialogTitle>Datos del producto</DialogTitle>
                    <DialogContent
                    >
                        <form 
                            className="bg-[#229C79] p-5 grid grid-cols-1 gap-4"
                            //onChange={() => handleIsDisabled()}
                        >
                            <TextField
                                error={errors.name == true}
                                required
                                fullWidth
                                variant="outlined"
                                label="Nombre del producto"
                                autoFocus
                                value={formDataProduct.nombre}
                                onChange={(e) => {validateFields("name", e.target.value); setErrors({...errors, name: false})}}
                                slotProps={{
                                    input: {
                                        startAdornment: (
                                        <InputAdornment position="start">
                                            <InventoryIcon />
                                        </InputAdornment>
                                        ),
                                    },
                                }}
                                inputProps={{
                                    maxLength: 80,
                                    minLength: 3
                                }}
                                helperText={`Mínimo 3, Máximo 80 caracteres`}
                            />
                            <div  className="grid gap-x-2 gap-y-4 sm:grid-cols-1 md:grid-cols-3 xl:grid-cols-3">
                                <TextField
                                    error={errors.precioBase}
                                    required
                                    fullWidth
                                    variant="outlined"
                                    label="Precio base"
                                    value={formDataProduct.precioBase}
                                    onChange={(e) => {validateFields("precioBase", e.target.value); setErrors({...errors, precioBase: false})}}
                                    slotProps={{
                                        input: {
                                            startAdornment: (
                                            <InputAdornment position="start">
                                                <AttachMoneyIcon />
                                            </InputAdornment>
                                            ),
                                        },
                                    }}
                                />
                                <TextField
                                    error={errors.stock}
                                    required
                                    fullWidth
                                    variant="outlined"
                                    label="Stock"
                                    value={formDataProduct.stockTotal}
                                    onChange={(e) => {validateFields("stockTotal", e.target.value); setErrors({...errors, stock: false})}}
                                    slotProps={{
                                        input: {
                                            startAdornment: (
                                            <InputAdornment position="start">
                                                <ChecklistIcon />
                                            </InputAdornment>
                                            ),
                                        },
                                    }}
                                />
                                <Box>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        label="Descuento"
                                        value={formDataProduct.descuento}
                                        onChange={(e) => {validateFields("descuento", e.target.value)}}
                                        slotProps={{
                                            input: {
                                                startAdornment: (
                                                <InputAdornment position="start">
                                                    <PercentIcon />
                                                </InputAdornment>
                                                ),
                                            },
                                        }}
                                        helperText={
                                            formDataProduct.precioBase > 0 && formDataProduct.descuento > 0 ?
                                                "Precio final: $ "+ (formDataProduct.precioBase - ((formDataProduct.precioBase * formDataProduct.descuento) / 100))
                                            :
                                                "Precio final: $ " + formDataProduct.precioBase
                                        }
                                    />
                                    {
                                        formDataProduct.descuento >= 50 ?
                                            <InvalidInputAlert
                                                Title={"El descuento supera el 50%"}
                                            />
                                        :
                                            null
                                    }
                                </Box>
                            </div>
                            <div  className="grid gap-x-2 gap-y-4 sm:grid-cols-2">
                                <Autocomplete
                                    getOptionLabel={(option) => option.name ? option.name : ""}
                                    value={formDataProduct.categoria}
                                    onChange={(_, newValue) => {
                                        setFormDataProduct({ ...formDataProduct, categoria: newValue });
                                        setErrors({...errors, categoria: false})
                                    }}
                                    className="w-full"
                                    id="product-categories"
                                    options={categoriesList}
                                    sx={{ width: 300 }}
                                    renderInput={(params) => <TextField onChange={()=>handleIsDisabled()} error={errors.categoria} className="w-full" {...params} variant="outlined" label="Categoría" />}
                                />
                                <Box>
                                    <Badge color="success">
                                        {formDataProduct.disponiblidad}
                                    </Badge>
                                    <Switch
                                        checked={checked}
                                        onChange={handleChange}
                                        slotProps={{ input: { 'aria-label': 'controlled' } }}
                                    />
                                </Box>
                            </div>

                            <Box className="mt-5" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                <InfoIcon sx={{ fontSize: { xs: 12, sm: 10}, color: "var(--destructive)" }} />
                                <Typography 
                                    variant="caption" 
                                    color="text.secondary"
                                    sx={{
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap',
                                        fontSize: { xs: '0.60rem', sm: '0.65rem' },
                                        color: "var(--destructive)"
                                    }}
                                >
                                    {"Debe completar el formulario anterior para poder agregar una variante."}
                                </Typography>
                            </Box>
                            <Accordion expanded={expandedAccordion === 'panel1'} onChange={handleAccordionChange('panel1')} sx={{ mb: 2 }}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                >
                                    <PostAdd sx={{ mr: 2 }} />
                                    <Typography>Variantes</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Box sx={{ pt: 2 }}>
                                        <div  className="grid gap-x-2 gap-y-4 sm:grid-cols-1 md:grid-cols-3 xl:grid-cols-3">
                                            <TextField
                                                error={errorsVariables.name}
                                                required
                                                fullWidth
                                                variant="filled"
                                                label="Nombre del producto"
                                                autoFocus
                                                value={formDataVariantProduct.nombre}
                                                onChange={(e) => {validateVariantFields("name", e.target.value); setErrorsVariables({...errors, name: false})}}
                                                slotProps={{
                                                    input: {
                                                        startAdornment: (
                                                        <InputAdornment position="start">
                                                            <InventoryIcon />
                                                        </InputAdornment>
                                                        ),
                                                    },
                                                }}
                                                inputProps={{
                                                    maxLength: 80,
                                                    minLength: 3
                                                }}
                                                helperText={`Mínimo 3, Máximo 80 caracteres`}
                                            />
                                            <TextField
                                                error={errorsVariables.precioBase}
                                                required
                                                fullWidth
                                                variant="filled"
                                                label="Precio base"
                                                value={formDataVariantProduct.precioBase}
                                                onChange={(e) => {validateVariantFields("precioBase", e.target.value); setErrorsVariables({...errors, precioBase: false})}}
                                                disabled={IsEmpty(formDataProduct.precioBase) || formDataProduct.precioBase == 0}
                                                slotProps={{
                                                    input: {
                                                        startAdornment: (
                                                        <InputAdornment position="start">
                                                            <AttachMoneyIcon />
                                                        </InputAdornment>
                                                        ),
                                                    },
                                                }}
                                                helperText={`Mayor o igual al precio base. Menor a igual al precio base * 3`}
                                            />
                                            <TextField
                                                error={errorsVariables.stock}
                                                required
                                                fullWidth
                                                variant="filled"
                                                label="Stock"
                                                value={formDataVariantProduct.stockTotal}
                                                onChange={(e) => {validateVariantFields("stockTotal", e.target.value); setErrorsVariables({...errors, stock: false})}}
                                                disabled={IsEmpty(formDataProduct.stockTotal) || formDataProduct.stockTotal == 0}
                                                slotProps={{
                                                    input: {
                                                        startAdornment: (
                                                        <InputAdornment position="start">
                                                            <ChecklistIcon />
                                                        </InputAdornment>
                                                        ),
                                                    },
                                                }}
                                                helperText={`No debe superar el stock principal. Contempla la suma del stock de las variantes existentes`}
                                            />
                                        </div>
                                        <div className='flex justify-end p-2'>
                                            <Button variant="contained" onClick={()=>{handleAddVariant()}}>Agregar +</Button>
                                        </div>
                                    </Box>
                                    {
                                        formDataProduct.variantes?.length > 0 ?
                                            <Box>
                                                <SimpleList
                                                    title={"Lista de variantes"}
                                                    items={formDataProduct.variantes}
                                                />
                                            </Box>
                                        :null
                                    }
                                </AccordionDetails>
                            </Accordion>
                        </form>
                        <Dialog
                            open={openChildModal}
                            onClose={handleCloseChild}
                            aria-labelledby="child-modal-title"
                            aria-describedby="child-modal-description"
                        >
                            <DialogContent>
                                <Alert variant="outlined" severity="error">
                                    Al dar clic en el botón, el producto no será creado
                                </Alert>
                            </DialogContent>
                            <DialogActions>
                                <CancelButton
                                    OnSubmit={handleClose}
                                    Label={"Salir sin guardar"}
                                    IsDisabled={false}
                                    marginTop={2}
                                    small={true}
                                />
                            </DialogActions>
                        </Dialog>
                        <Snackbar
                            open={openSnackBar}
                            autoHideDuration={6000}
                            onClose={handleCloseSnackBar}
                            message="Formulario guardado con éxito"
                        />
                    </DialogContent>
                    <DialogActions className="pr-5">
                        <SubmitButton
                            OnSubmit={handleCreateProduct}
                            Label={"Guardar"}
                            IsDisabled={isDisabled}
                            marginTop={2}
                            small={true}
                        />
                        <CancelButton
                            OnSubmit={handleCancel}
                            Label={"Cancelar"}
                            IsDisabled={false}
                            marginTop={2}
                            small={true}
                        />
                    </DialogActions>
            </Dialog>
        </motion.div>
    </AnimatePresence>
    )
}

export default ProductModal;