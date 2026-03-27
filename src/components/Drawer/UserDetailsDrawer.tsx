import * as React from 'react';
import { useRef, useEffect } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListSubheader from '@mui/material/ListSubheader';
import {
  Typography,
} from '@mui/material';

import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PlaylistAddCheckCircleIcon from '@mui/icons-material/PlaylistAddCheckCircle';

import type { UserDetailsDrawerType} from "@/types/Components"

const UserDetailsDrawer = ({
    open,
    setOpen,
    details,
    setDetails
}: UserDetailsDrawerType)=> {
    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
        //setDetails([]);
    };

    const totalUnidades = details.reduce((acumulador, producto) => acumulador + producto.quantity, 0);
    const totalPrecio = details.reduce((acumulador, producto) => acumulador + producto.total, 0);

    return(
        <Drawer 
            open={open} 
            onClose={toggleDrawer(false)}
            anchor='right'
        >
            <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
                <List 
                    subheader={
                        <ListSubheader component="div" id="nested-list-subheader">
                            Lista de productos
                        </ListSubheader>
                    }
                >
                    {
                        details?.length > 0 ? 
                            details?.map((det, idx) => (
                                <>
                                    <ListItem key={idx} disablePadding>
                                        <ListItemButton>
                                            <ListItemAvatar>
                                                <Avatar src={det?.thumbnail} />
                                            </ListItemAvatar>
                                            <ListItemText primary={det?.title} secondary={det?.quantity + " unidades por " + " $" + det?.total} />
                                        </ListItemButton>
                                    </ListItem>
                                    <Divider />
                                </>
                            ))
                        : 
                            <>
                                <ListItem key={"not-data"} disablePadding>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <RemoveShoppingCartIcon />
                                        </ListItemIcon>
                                        <ListItemText primary={"Sin carrito..."} />
                                    </ListItemButton>
                                </ListItem>
                                <Divider />
                            </>
                    }
                </List>
                <Box className="mt-5 ml-5" sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.3 }}>
                    <PlaylistAddCheckCircleIcon sx={{ fontSize: { xs: 18, sm: 25 }, color: 'text.secondary' }} />
                    <Typography 
                        variant="caption" 
                        color="text.secondary"
                        sx={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            fontSize: { xs: '0.60rem', sm: '0.65rem' },
                        }}
                    >
                        {"Unidades en total: " + totalUnidades }
                    </Typography>
                </Box>
                <Box className="mt-2 ml-5" sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.3 }}>
                    <AttachMoneyIcon sx={{ fontSize: { xs: 18, sm: 25 }, color: 'text.secondary' }} />
                    <Typography 
                        variant="caption" 
                        color="text.secondary"
                        sx={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            fontSize: { xs: '0.60rem', sm: '0.65rem' },
                        }}
                    >
                        {"Precio Total: " + totalPrecio }
                    </Typography>
                </Box>
            </Box>
        </Drawer>
    )
}

export default UserDetailsDrawer;