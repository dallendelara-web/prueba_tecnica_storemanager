export const CapitalizarString = (string: string) => {
    if (!string) return ""; // Manejar cadenas vacías
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}


export const nombreProducto = (val: string)=> {
    if(val == "" || val == null) return true;
    const regex = /^[a-zA-Z0-9\s_-]+$/;
    return regex.test(CapitalizarString(val));
}

export const precioProducto = (val: string)=> {
    if(val == "" || val == null) return true;
    if(val == "0") return false;
    //const regex = /^\d+(?:[.,]\d{1,2})?$/;
    const regex = /^\d+(?:[.,]\d{0,2})?$/;
    return regex.test(val);
}

export const stockProducto = (val: string)=> {
    if(val == "" || val == null) return true;
    const regex = /^[1-9]\d*$/;
    return regex.test(val);
}

export const descuentoProducto = (val: string)=> {
    if(val == "" || val == null) return true;
    const regex = /^(100|[1-9][0-9]?)$/;
    return regex.test(val);
}