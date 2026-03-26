import { useNavigate } from "react-router";
import React, { useRef, useEffect } from 'react';
import { useState } from "react";

import { useAuth } from "@/Context/AuthContextUser";
import { useStore } from "@/store/useStore";

import { 
    Plus,
    Filter
} from "lucide-react";

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

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
import ProductCard from "@/components/Cards/ProductCard";

const HomePage = () => {
    const { user } = useAuth();
    const { getProductsList, isLoadingGetProductsList, getProductsListError, getProductsListSuccess } = useStore();

    const [productsList, setProductsList] = useState([]);
    const [totalDocs, setTotalDocs] = useState(0);
    const [limit, setLimit] = useState(12);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState("");
    const [filterData, setFilterData] = useState<string>("categoria");

    useEffect(() => {
        if(user?.id){
           getProductsList(limit?.toString(), "0");
        }
    }, []);

    useEffect(() => {
        if(getProductsListSuccess?.data?.products?.length > 0){
            setTotalDocs(getProductsListSuccess?.data?.total)
            setProductsList(getProductsListSuccess?.data?.products);
        }
    }, [getProductsListSuccess]);

    useEffect(() => {
        if(totalDocs > 0){
            const countPages = Math.ceil(totalDocs / limit);
            setTotalPages(countPages);
        }
    }, [totalDocs]);

    const handleChange = (event, value) => {
        const skipt = value == 1 ? 0 : limit * (value-1);
        setPage(value);
        getProductsList(limit?.toString(), skipt.toString());
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
                        //onClick={handleCreateRequest}
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
                            <Filter className="h-4 w-4 mr-2" />
                            <SelectValue placeholder="Filtrar por" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="categoria">Categoría</SelectItem>
                            <SelectItem disabled value="0">...</SelectItem>
                        </SelectContent>
                        </Select>
                    </div>
                }
            />
            <div id="home-page" style={{width:"100%", margin: 0}} className="grid grid-cols-1 gap-4">
                {
                    isLoadingGetProductsList ?
                    <div className="container mx-auto">
                        <div className="flex items-center justify-center w-full">
                            <WatingData />
                        </div>
                    </div>
                    :
                        productsList?.length > 0 ?
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
                            <Pagination 
                                count={totalPages} 
                                variant="outlined" 
                                color="secondary" 
                                page={page}
                                onChange={handleChange}
                            />
                            </div>
                        :
                            <span className="text-blue-950">PRUEBA</span> 
                }
            </div>
        </div>
    );
}

export default HomePage;