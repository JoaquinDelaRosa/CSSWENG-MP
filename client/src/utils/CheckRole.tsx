export const getRole = () =>  {
    return sessionStorage.getItem("role");
}

export const isRole = (x : string) => {
    return sessionStorage.getItem("Role")?.toLowerCase() === x;
}