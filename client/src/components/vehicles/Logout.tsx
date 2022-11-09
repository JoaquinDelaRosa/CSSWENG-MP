import { createAPIEndpoint, ENDPOINTS } from "../../api";
import { ROUTES } from "../../api/routes";

export const Logout = () => {

    const onClick = () => {
        createAPIEndpoint(ENDPOINTS.logout).post({token : "Hello"})
        .then(() => {
              
        });
    }

    return (
        <div> 
            <button> Logout </button>
        </div>
    );
}