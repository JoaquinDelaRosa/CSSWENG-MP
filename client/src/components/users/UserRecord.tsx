import { useState, useEffect } from "react";
import { createAPIEndpoint, ENDPOINTS } from "../../api";
import { Customer, CustomerRequest } from "../customers/CustomerDetails";
import { ModalWrapper } from "../ModalBase";
import { RequestUser } from "./RequestUser";
import { User } from "./UserDetails";

export const DeleteUser = (props : {user : User, observer : Function}) => {
    const onSubmit = () => {
        createAPIEndpoint(ENDPOINTS.deleteUser).delete({"id" : props.user.id})
            .then((response) => {
                props.observer();
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
      <div>
        <button onClick={onSubmit}> Delete </button>
      </div> 
    );
}

export const UpdateUser = (props : {user : User, observer : Function}) => {
    const [data, setData] = useState<CustomerRequest>();
    
    useEffect(() => {
        createAPIEndpoint(ENDPOINTS.updateUser).post(data, {id: props.user.id})
        .then(function (response) {
            props.observer();
        })
        .catch(function (error) {
            console.log(error);
        })
    }, [data])

    return (
        <div>
          <ModalWrapper name="Edit">
            <RequestUser setResponse={setData} default={props.user}/>
          </ModalWrapper>
        </div>
    )
}

export const UserRecord = (props : { user: User, observer: Function }) => {
    return (
        <tr>
            <td> <DeleteUser user={props.user} observer={props.observer}/></td>
            <td> <UpdateUser user={props.user} observer={props.observer}/></td>
            <td> {props.user.firstName} </td>
            <td> {props.user.lastName} </td>
            <td> {props.user.username} </td>
        </tr> 
     );
}