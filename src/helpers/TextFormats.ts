export const CapitalizarString = (string: string) => {
    if (!string) return ""; // Manejar cadenas vacías
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}
