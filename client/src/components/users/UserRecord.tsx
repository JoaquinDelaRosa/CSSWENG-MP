import { DeleteUser } from "./DeleteUser";
import { UpdateUser } from "./UpdateUser";
import { User } from "./UserDetails";

export const UserRecord = (props : { user: User, observer: Function }) => {
    return (
        <tr>
            <td> <DeleteUser user={props.user} observer={props.observer}/></td>
            <td> <UpdateUser user={props.user} observer={props.observer}/></td>
            <td> {props.user.firstName} </td>
            <td> {props.user.lastName} </td>
            <td> {props.user.username} </td>
            <td> {props.user.role} </td>
        </tr> 
     );
}