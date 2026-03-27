import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import type {SimpleListProps} from "@/types/Components"
import ListItem from '@mui/material/ListItem';
import {
  Typography,
  Box,
} from '@mui/material';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import InventoryIcon from '@mui/icons-material/Inventory';

const SimpleList = ({
    title,
    items
}: SimpleListProps)=> {
  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          {title ?? "Lista"}
        </ListSubheader>
      }
    >
        {
            items?.length > 0 ?
                items?.map((variant, index) => (
                    <ListItem disablePadding key={index}>
                        <ListItemAvatar>
                            <Avatar>
                                <TaskAltIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText 
                            primary={variant?.nombre ?? "Sin dato"} 
                            secondary={
                            <>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                    <AttachMoneyIcon sx={{ fontSize: { xs: 18, sm: 20}, color: 'text.secondary' }} />
                                    <Typography 
                                        variant="caption" 
                                        color="text.secondary"
                                        sx={{
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap',
                                        fontSize: { xs: '0.90rem', sm: '0.95rem' },
                                        }}
                                    >
                                        {variant?.precioBase ?? "Sin dato"}
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.3 }}>
                                    <InventoryIcon sx={{ fontSize: { xs: 17, sm: 18 }, color: 'text.secondary' }} />
                                    <Typography 
                                        variant="caption" 
                                        color="text.secondary"
                                        sx={{
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap',
                                            fontSize: { xs: '0.90rem', sm: '0.95rem' },
                                        }}
                                    >
                                        {variant?.stockTotal ? variant?.stockTotal + " unidades": "Sin dato"}
                                    </Typography>
                                </Box>
                            </>
                        }
                        />
                    </ListItem>
                ))
            : null

        }
    </List>
  );
}


export default SimpleList