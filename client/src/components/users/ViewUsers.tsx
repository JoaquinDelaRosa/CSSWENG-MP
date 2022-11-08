import { useEffect, useState } from "react";
import { createAPIEndpoint, ENDPOINTS } from "../../api";
import { User } from "./UserDetails";


const UserRecord = (props : { user: User }) => {
    return (
        <tr>
            <td> {props.user.firstName} </td>
            <td> {props.user.lastName} </td>
            <td> {props.user.username} </td>
        </tr> 
     );
}

const UsersView = () => {

    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        await createAPIEndpoint(ENDPOINTS.customers).fetch()
            .then((response) => {
                return response.data;
            })
            .then((data) => {
                const usersList = data.map((value: any) => {
                    let user: User = value;
                    return user;
                });

                return usersList
            })
            .then((list) => {
                setUsers(list);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        fetchUsers();
    }, []);


    return (
        <div className="objectView">
            <table>
                <thead>
                    <tr>
                        <th> First Name </th>
                        <th> Last Name</th>
                        <th> Username </th>
                    </tr>
                </thead>

                <tbody>
                    {users.map((value, index) => {
                        return (<UserRecord user={value} key={index } />);
                    })}
                </tbody>
            </table>
        </div>      
    );
}

export default UsersView;