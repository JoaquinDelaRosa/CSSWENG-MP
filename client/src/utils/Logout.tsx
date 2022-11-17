
import { useNavigate } from "react-router-dom"
import { createAPIEndpoint, ENDPOINTS } from "../api"
import { ROUTES } from "../api/routes"
import { removeRole } from "./CheckRole"

export const Logout = (props: {setIsLoggedIn : Function}) => {
    const navigation = useNavigate()
    createAPIEndpoint(ENDPOINTS.logout).post({})
    .then(response => {
        console.log(response)
        props.setIsLoggedIn(false);
        sessionStorage.setItem("isLoggedIn", "false");
        removeRole();
        navigation(ROUTES.login)
    })
    .catch((err) => {
        console.log(err)
    })

    return(
        <>
        </>
    )
}