import { useNavigate } from "react-router-dom"
import { createAPIEndpoint, ENDPOINTS } from "../api"
import { ROUTES } from "../api/routes";

export const Logout = () => {
    createAPIEndpoint(ENDPOINTS.logout).post({})
    .then(response => {
        console.log(response)
        
    })
    .catch((err) => {
        console.log(err)
    })

    return(
        <>
        </>
    )
}