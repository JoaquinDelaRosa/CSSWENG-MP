import jwtDecode from "jwt-decode";

interface token {
    exp: number,
    iat: number,
    id: string,
    iss: string,
    role: string
}

export const getRole = () =>  {
    return sessionStorage.getItem("role");
}

export const isRole = (x : string) => {
    return sessionStorage.getItem("role")?.toLowerCase() === x.toLowerCase();
}

export const setRole = (token : string) => {
    const decoded = jwtDecode<token>(token);
    const role = decoded.role;
    sessionStorage.setItem("role", role);
}

export const removeRole = () => {
    sessionStorage.removeItem("role")
}