import { useState, useEffect } from "react";
import { createAPIEndpoint, ENDPOINTS } from "../../api";
import { isRole } from "../../utils/CheckRole";
import { DeleteUser } from "./DeleteUser";
import { UpdateUser } from "./UpdateUser";
import { User } from "./UserDetails";

export const UserRecord = (props : { user: User, rerenderFlag: Function}) => {
    const [user, setUser] = useState<User | null>(props.user);

    useEffect(() => {
        if (props && props.user){
            setUser(props.user);
        } else {
            setUser(null);
        }
    }, [props, props.user])

    const onUpdate = () => {
        createAPIEndpoint(ENDPOINTS.getUser).fetch({id : props.user.id})
        .then((response) => {
            setUser(response.data);
        })
    };

    const onDelete = () => {
        props.rerenderFlag();
    }

    if (user) {
    return (
            <tr>
                <td> {user?.firstName} </td>
                <td> {user?.lastName} </td>
                <td> {user?.username} </td>
                <td> {user?.role} </td>
                <td hidden={isRole("VIEW") || isRole("VIEW_EDIT")}> <UpdateUser user={props.user} observer={onUpdate}/></td>
                <td hidden={isRole("VIEW") || isRole("VIEW_EDIT")}> <DeleteUser user={props.user} observer={onDelete}/></td>
            </tr> 
        );
    }
     else {
        return null;
    }
}