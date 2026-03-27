import { useNavigate } from 'react-router';
import {
  Box,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Chip,
  Divider,
} from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { 
    CheckCircle,
    CircleDollarSign
} from "lucide-react";
import "./styles.css"

import InventoryIcon from '@mui/icons-material/Inventory';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import PercentIcon from '@mui/icons-material/Percent';
import FlagCircleIcon from '@mui/icons-material/FlagCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MarkunreadIcon from '@mui/icons-material/Markunread';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';

import type { UserCartCardProps} from "@/types/Components"
import { CapitalizarString } from "@/helpers/TextFormats"

const UserCartCard = ({
    nombre,
    email,
    numeroCarritos,
    image,
    onAction
}: UserCartCardProps)=> {
    return (
        <Card 
            sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                transform: 'scale(1.02)',
                boxShadow: 4,
                cursor: 'pointer',
                },
            }}
            className='product-card'
        >
            {
                image ? 
                    <CardMedia
                        component="img"
                        height="50"
                        image={image}
                        alt={nombre}
                        sx={{ objectFit: 'cover' }}
                        onError={(e: any) => {
                            e.target.src = '/1.png'; // Fallback image
                        }}
                    />
                :
                    null
            }
            <CardContent sx={{ flexGrow: 1, pb: 0.5, pt: 1, px: 1.5 }}>
                <Typography
                    variant="h6" 
                    component="div" 
                    sx={{ 
                        fontSize: { xs: '0.85rem', sm: '0.9rem' }, 
                        fontWeight: 600,
                        mb: 0.5,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                    }}
                >
                    {nombre ?? "Sin dato"}
                </Typography>
                
                <Card className='product-card-bg grid gap-x-2 gap-y-4 '>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.3 }}>
                        <AlternateEmailIcon sx={{ fontSize: { xs: 18, sm: 25 }, color: 'text.secondary' }} />
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
                            {email ?? "Sin dato"}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <ShoppingCartIcon sx={{ fontSize: { xs: 18, sm: 20}, color: 'text.secondary' }} />
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
                            {numeroCarritos ? numeroCarritos +" ID" : "Sin dato"}
                        </Typography>
                    </Box>
                </Card>
            </CardContent>
            <CardActions sx={{ px: 1.5, pb: 1, pt: 0 }}>
                <Button 
                size="small" 
                variant="contained" 
                fullWidth
                sx={{ fontSize: { xs: '0.95rem', sm: '0.7rem' }, py: 0.4 }}
                onClick={(e) => {
                    onAction();
                    e.stopPropagation();
                    //navigate('/service-details', { state: service });
                }}
                >
                 Ver Detalles
                </Button>
            </CardActions>
        </Card>
    )
}

export default UserCartCard;