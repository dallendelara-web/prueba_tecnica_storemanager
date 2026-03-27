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
import { filtered } from "@/helpers/FilterArray"

import WatingData from "@/components/LottieAnimations/WatingData";
import NotDataFound from "@/components/LottieAnimations/NotDataFound";
import UserCartCard from "@/components/Cards/UserCartCard";
import UserDetailsDrawer from "@/components/Drawer/UserDetailsDrawer"

const UsersCarts = () => {
    const { user } = useAuth();
    const { getUsers, isLoadingGetUsers, getUsersError, getUsersSuccess } = useStore();
    const { getUserDetails, isLoadingGetUserDetails, getUserDetailsError, getUserDetailsSuccess } = useStore();

    const [openDrawer, setOpenDrawer] = React.useState(false);
    const [search, setSearch] = useState("");
    const [filterData, setFilterData] = useState<string>("all");
    const debouncedSearchTerm = useDebounce(search, 300);

    const [usersList, setUsersList] = useState([]);
    const [usersFullList, setUsersFullList] = useState([]);
    const [totalDocs, setTotalDocs] = useState(0);
    const [limit, setLimit] = useState(12);
    const [page, setPage] = useState(1);
    const [skipt, setSkipt] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [searchPlaceholder, setSearchPlaceholder] = useState("Seleccione un filtro...");
    const [userDetails, setUserDetails] = useState([]);

    useEffect(() => {
        if(user?.id && !isLoadingGetUsers){
            getUsers(limit?.toString(), "0");
        }
    }, []);

    useEffect(() => {
        if(getUsersSuccess?.data?.users?.length > 0){
            const res = getUsersSuccess?.data?.users.map(function (ev: any) {
                return ({
                    ...ev,
                    fullName: ev?.firstName+ " " + ev?.lastName
                })
            });
            setTotalDocs(getUsersSuccess?.data?.total)
            setUsersFullList(res);
            if(filterData == "all"){
                setUsersList(res);
            }else{
                //Función para filtrar
                if (!IsEmpty(search.trim())) {
                    const filteredData = filtered(res, filterData, search.trim());
                    setUsersList(filteredData);
                }else{
                    setUsersList(res);
                }
            }
        }else{
            setTotalDocs(0)
            setUsersList([]);
            setUsersFullList([]);
        }
    }, [getUsersSuccess]);

    useEffect(() => {
        if(getUserDetailsSuccess?.data?.carts?.length > 0){
            setUserDetails(getUserDetailsSuccess?.data?.carts[0]?.products);
        }else{
            setUserDetails([]);
        }
    }, [getUserDetailsSuccess]);


    useEffect(() => {
        if(totalDocs > 0){
            const countPages = Math.ceil(totalDocs / limit);
            setTotalPages(countPages);
        }
    }, [totalDocs]);

    useEffect(() => {
        setSearchPlaceholder("Seleccione un filtro...");
        if(filterData == "all" && usersFullList?.length > 0 && search?.trim() != ""){
            setSearch("");
            getUsers(limit?.toString(), skipt?.toString());
        }
        else if(filterData == "fullName"){
            setSearchPlaceholder("Buscar por Nombre de usuario..");
            executeDebunced();
        }
        else if(filterData == "email"){
            setSearchPlaceholder("Buscar por Email..");
            executeDebunced();
        }
    }, [filterData]);

    useEffect(() => {
        if (debouncedSearchTerm && filterData !=="all") {
            executeDebunced();
        }
    }, [debouncedSearchTerm]);

    const executeDebunced = ()=> {
        if (IsEmpty(search.trim())) {
            //
        } else {
            //Función para filtrar
            const filteredData = filtered(usersFullList, filterData, search.trim());
            setUsersList(filteredData);
        }
    }

    const handleChange = (event, value) => {
        const skipt = value == 1 ? 0 : limit * (value-1);
        setPage(value);
        setSkipt(skipt);
        getUsers(limit?.toString(), skipt.toString());
        
    };

    const handleGetUserDetail = (ID: string)=> {
        setOpenDrawer(true);
        getUserDetails(ID);
    }

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
                    searchPlaceholder={searchPlaceholder ?? ""}
                    actions={
                        <div className="flex flex-row gap-x-2">
                            <Select value={filterData} onValueChange={setFilterData}>
                            <SelectTrigger className="w-[180px] border-none">
                                <Filter className="h-4 w-4 mr-2" />
                                <SelectValue placeholder="Buscar por" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Mostrar todos</SelectItem>
                                <SelectItem value="fullName">Nombre usuario</SelectItem>
                                <SelectItem value="email">Email</SelectItem>
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
                                        usersList?.map((user, idx) => (
                                            <UserCartCard
                                                key={idx}
                                                nombre={user?.fullName}
                                                email={user?.email}
                                                numeroCarritos={user?.id}
                                                onAction={()=>{handleGetUserDetail(user?.id)}}
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
            <UserDetailsDrawer
                open={openDrawer}
                setOpen={setOpenDrawer}
                details={userDetails}
                setDetails={setUserDetails}
            />
        </div>
    );
}

export default UsersCarts;