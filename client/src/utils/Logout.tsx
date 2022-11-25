
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { createAPIEndpoint } from "../api"
import { ENDPOINTS } from "../api/endpoints"
import { ROUTES } from "../api/routes"
import { removeRole } from "./CheckRole"

export const Logout = (props: {setIsLoggedIn : Function}) => {
    const navigation = useNavigate()

    useEffect(() => {
        navigation(ROUTES.login);
    }, [props.setIsLoggedIn])

    createAPIEndpoint(ENDPOINTS.logout).post({})
    .then((response) => {
        sessionStorage.setItem("isLoggedIn", "false");
        removeRole();
    })
    .then(() => {
        props.setIsLoggedIn(false);
    })
    .catch((err) => {
        console.log(err)
    })

    return(
        <>
        </>
    )
}