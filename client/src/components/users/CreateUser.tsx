import { createAPIEndpoint } from "../../api";
import { ENDPOINTS } from "../../api/endpoints";
import { ModalWrapper } from "../base/ModalBase";
import { RequestUser } from "./RequestUser";

export const CreateUser = (props : {observer : Function}) => {
    const setData = (data : any) => {
        createAPIEndpoint(ENDPOINTS.addUser).post(data)
        .then(function (response) {
            props.observer();
        })
        .catch(function (error) {
            console.log(error);
        });
    };

    return (
        <div>
            <ModalWrapper front={"Create User"}> 
                <RequestUser setResponse={setData}/>
            </ModalWrapper>
        </div> 
    );
}