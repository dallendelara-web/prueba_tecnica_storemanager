import { useNavigate } from "react-router";
import React, { useRef, useEffect } from 'react';
import { useState } from "react";

import { useAuth } from "@/Context/AuthContextUser";
import { useStore } from "@/store/useStore";
import { useDebounce } from '@/hooks/UseDebunce'; 

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
import Pagination from '@mui/material/Pagination';

import { 
    Plus,
    Filter,
    ArrowUpWideNarrow
} from "lucide-react";

import { IsEmpty } from '@/helpers/ValidateValue';

import WatingData from "@/components/LottieAnimations/WatingData";
import NotDataFound from "@/components/LottieAnimations/NotDataFound";
import UserCartCard from "@/components/Cards/UserCartCard"

const UsersCarts = () => {
    const { user } = useAuth();
    const { getUsers, isLoadingGetUsers, getUsersError, getUsersSuccess } = useStore();

    const [open, setOpen] = React.useState(false);
    const [search, setSearch] = useState("");
    const [filterData, setFilterData] = useState<string>("");
    const debouncedSearchTerm = useDebounce(search, 300);

    const [usersList, setUsersList] = useState([]);
    const [totalDocs, setTotalDocs] = useState(0);
    const [limit, setLimit] = useState(12);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        if(user?.id && !isLoadingGetUsers){
            getUsers(limit?.toString(), "0");
        }
    }, []);

    useEffect(() => {
            if(getUsersSuccess?.data?.users?.length > 0){
            setTotalDocs(getUsersSuccess?.data?.total)
            setUsersList(getUsersSuccess?.data?.users);
        }else{
            setTotalDocs(0)
            setUsersList([]);
        }
    }, [getUsersSuccess]);

    useEffect(() => {
        if(totalDocs > 0){
            const countPages = Math.ceil(totalDocs / limit);
            setTotalPages(countPages);
        }
    }, [totalDocs]);

    useEffect(() => {
            
    }, [filterData]);

    useEffect(() => {
            if (debouncedSearchTerm) {
            if (IsEmpty(search.trim())) {
                //getProductsList(limit?.toString(), "0");
            } else {
                //getProductsByCategory(search.trim(), limit?.toString(), "0")
            }
        }
    }, [debouncedSearchTerm]);

    const handleChange = (event, value) => {
        const skipt = value == 1 ? 0 : limit * (value-1);
        setPage(value);
        if (IsEmpty(search.trim())){
            //getProductsList(limit?.toString(), skipt.toString());
        }else{
            //getProductsByCategory(search.trim(), limit?.toString(), skipt.toString())
        }
    };

    return(
        <div className="p-0 grid grid-cols-1 gap-4">
            <div id="users-page" style={{width:"100%", margin: 0}}>
                <Header
                    title="Carritos usuarios"
                    subtitle="Consulta de carritos por usuarios"
                />
                <FilterComponent
                    search={search}
                    setSearch={setSearch}
                    searchPlaceholder={""}
                    actions={
                        <div className="flex flex-row gap-x-2">
                            <Select value={filterData} onValueChange={setFilterData}>
                            <SelectTrigger className="w-[180px] border-none">
                                <Filter className="h-4 w-4 mr-2" />
                                <SelectValue placeholder="Buscar por" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="user_name">Nombre usuario</SelectItem>
                                <SelectItem value="e_mail">Email</SelectItem>
                            </SelectContent>
                            </Select>
                        </div>
                    }
                />
                {
                    isLoadingGetUsers?
                        <div className="container mx-auto">
                            <div className="flex items-center justify-center w-full">
                                <WatingData />
                            </div>
                        </div>
                    :
                        usersList?.length > 0 ?
                            <div className="grid gap-x-2 gap-y-4 mt-5">
                                <div  className="grid gap-x-2 gap-y-4 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                                    {
                                        usersList?.map((user) => (
                                            <UserCartCard
                                                nombre={user?.firstName +" "+user?.lastName}
                                                email={user?.email}
                                                numeroCarritos={user?.id}
                                                onAction={()=>{console.log("Show drawer")}}
                                                //image={user?.image}
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
        </div>
    );
}

export default UsersCarts;