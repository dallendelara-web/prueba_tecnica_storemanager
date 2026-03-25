export const IsEmpty = (value: any) => {
    let response = false;

    if (value == null || value == undefined) response = true;
    if (typeof value === 'string' && (value.length === 0 || value.trim() == "")) response = true;
    if (Array.isArray(value) && value.length === 0) response = true;
    if (typeof value === 'object' && value !== null && Object.keys(value).length === 0) response = true;

    return response;
}