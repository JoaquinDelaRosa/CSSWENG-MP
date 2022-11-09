import { createAPIEndpoint, ENDPOINTS } from "../../api";
import { RequestUser } from "./RequestUser";

export const CreateUser = (props : {observer : Function}) => {
    const setData = (data : any) => {
        createAPIEndpoint(ENDPOINTS.addUser).post(data)
        .then(function (response) {
            props.observer();
        })
        .catch(function (error) {
            console.log(error);
        })
    };

    return (
        <div>
            <RequestUser setResponse={setData}/>
        </div> 
    );
}