import { useNavigate } from "react-router";
import React, { useRef, useEffect } from 'react';
import { useState } from "react";

import { useAuth } from "@/Context/AuthContextUser";
import { useStore } from "@/store/useStore";

import { 
    Plus,
    Filter,
    ArrowUpWideNarrow
} from "lucide-react";

import Pagination from '@mui/material/Pagination';
import { IsEmpty } from '@/helpers/ValidateValue';
import { useDebounce } from '@/hooks/UseDebunce'; 
import { sortNumeric, sortString } from '@/helpers/FilterArray';

import { Button } from "@/components/ui/button";
import Header from "@/components/Header/Header";
import FilterComponent from "@/components/Header/FilterComponent";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import WatingData from "@/components/LottieAnimations/WatingData";
import NotDataFound from "@/components/LottieAnimations/NotDataFound";
import ProductCard from "@/components/Cards/ProductCard";
import ProductModal from "@/components/ProductModal/ProductModal";
import { useProductSaved } from "@/Context/ProductSavedContext";

const HomePage = () => {
    const { user } = useAuth();
    const { nombre } = useProductSaved();
    const { getProductsList, isLoadingGetProductsList, getProductsListError, getProductsListSuccess } = useStore();
    const { getProductsByCategory, getProductsByCategoryError, isLoadingGetProductsByCategory } = useStore();

    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = () => {
        setOpen(true);
    };

    const [productsList, setProductsList] = useState([]);
    const [totalDocs, setTotalDocs] = useState(0);
    const [limit, setLimit] = useState(12);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState("");
    const [filterData, setFilterData] = useState<string>("");
    const debouncedSearchTerm = useDebounce(search, 300);

    useEffect(() => {
        if(user?.id){
           getProductsList(limit?.toString(), "0");
        }
    }, []);

    useEffect(() => {
        if(getProductsListSuccess?.data?.products?.length > 0){
            setTotalDocs(getProductsListSuccess?.data?.total)
            setProductsList(getProductsListSuccess?.data?.products);
        }else{
            setTotalDocs(0)
            setProductsList([]);
        }
    }, [getProductsListSuccess]);

    useEffect(() => {
        if(totalDocs > 0){
            const countPages = Math.ceil(totalDocs / limit);
            setTotalPages(countPages);
        }
    }, [totalDocs]);

    /*useEffect(() => {
        if (IsEmpty(search.trim())) {
            getProductsList(limit?.toString(), "0");
        } else {
            
        }
    }, [search]); */

    useEffect(() => {
        if (debouncedSearchTerm) {
            if (IsEmpty(search.trim())) {
                getProductsList(limit?.toString(), "0");
            } else {
                getProductsByCategory(search.trim(), limit?.toString(), "0")
            }
        }
    }, [debouncedSearchTerm]);

    useEffect(() => {
        if(filterData == "precio"){
            setProductsList(sortNumeric(productsList, "price"));
        }
        if(filterData == "rating"){
            setProductsList(sortNumeric(productsList, "rating"));
        }
    }, [filterData]);

    const handleChange = (event, value) => {
        const skipt = value == 1 ? 0 : limit * (value-1);
        setPage(value);
        if (IsEmpty(search.trim())){
            getProductsList(limit?.toString(), skipt.toString());
        }else{
            getProductsByCategory(search.trim(), limit?.toString(), skipt.toString())
        }
    };

    return(
        <div className="p-0 grid grid-cols-1 gap-4">
            <Header
                title="Catálogo de productos"
                subtitle="Gestión de productos disponibles"
                headerActions={
                <div className="flex gap-x-2">
                    <Button 
                        size="sm" 
                        onClick={() => setOpen(true)}
                    >
                        <Plus className="h-4 w-4 mr-2" />
                        Nuevo producto
                    </Button>
                </div>
                }
            />
            <FilterComponent
                search={search}
                setSearch={setSearch}
                searchPlaceholder={"Buscar por categoría"}
                actions={
                    <div className="flex flex-row gap-x-2">
                        <Select value={filterData || "folio"} onValueChange={setFilterData}>
                        <SelectTrigger className="w-[180px] border-none">
                            <ArrowUpWideNarrow className="h-4 w-4 mr-2" />
                            <SelectValue placeholder="Ordenar por" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="precio">Precio</SelectItem>
                            <SelectItem value="rating">Rating</SelectItem>
                        </SelectContent>
                        </Select>
                    </div>
                }
            />
            <div id="home-page" style={{width:"100%", margin: 0}} className="grid grid-cols-1 gap-4">
                {
                    isLoadingGetProductsList || isLoadingGetProductsByCategory?
                    <div className="container mx-auto">
                        <div className="flex items-center justify-center w-full">
                            <WatingData />
                        </div>
                    </div>
                    :
                        productsList?.length > 0 ?
                            <div className="grid gap-x-2 gap-y-4">
                                <div  className="grid gap-x-2 gap-y-4 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3"> 
                                    {
                                        productsList?.map((product) => (
                                            <ProductCard
                                                nombre={product?.title}
                                                description={product?.description}
                                                categoria={product?.category}
                                                precioBase={product?.price}
                                                stockTotal={product?.stock}
                                                descuento={product?.discountPercentage}
                                                disponiblidad={product?.availabilityStatus}
                                                rating={product?.rating}
                                                thumbnail={product?.thumbnail}
                                                variantes={[]}
                                                onEdit={()=>{console.log("EDITADO jeje")}}
                                            />
                                            
                                        ))
                                    }
                                </div>
                                <Pagination 
                                    className="mt-5"
                                    count={totalPages} 
                                    variant="outlined" 
                                    color="secondary" 
                                    page={page}
                                    onChange={handleChange}
                                />
                            </div>
                        :
                            <div className="container mx-auto">
                                <div className="flex items-center justify-center w-full">
                                    <NotDataFound />
                                </div>
                            </div>
                }
            </div>
            <ProductModal
                open={open}
                setOpen={setOpen}
            />
        </div>
    );
}

export default HomePage;