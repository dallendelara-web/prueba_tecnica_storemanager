export const filtered = (array: any, field: string, value: string)=> {
    if (typeof value === 'string'){
        return array?.filter((object: any) =>
            (object?.[field]?.toString().toLowerCase())?.includes(value?.toString()?.toLowerCase())
        );
    }else {
        return array?.filter((object: any) =>
            (object?.[field])?.includes(value)
        );
    }
}

export const sortString = (array: any[], field: string)=> {
    return array.sort((a, b) => a?.[field].localeCompare(b?.[field]));
}

export const sortNumeric = (array: any[], field: string)=> {
    return array.sort((a, b) => a?.[field] - b?.[field]);
}