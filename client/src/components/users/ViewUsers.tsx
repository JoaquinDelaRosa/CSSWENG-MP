import { useEffect, useState } from "react";
import { createAPIEndpoint, ENDPOINTS } from "../../api";
import { ModalWrapper } from "../ModalBase";
import { CreateUser } from "./CreateUser";
import { User } from "./UserDetails";
import { UserRecord } from "./UserRecord";

const UsersView = () => {

    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        await createAPIEndpoint(ENDPOINTS.users).fetch()
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

    const updateView = async () => {
        fetchUsers();
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div className="objectView">
            <table>
                <thead>
                    <tr>
                        <th/>
                        <th/>
                        <th> First Name </th>
                        <th> Last Name</th>
                        <th> Username </th>
                    </tr>
                </thead>

                <tbody>
                    {users.map((value, index) => {
                        return (<UserRecord user={value} key={index } observer={updateView} />);
                    })}
                </tbody>
            </table>
            
            <ModalWrapper front={"Create User"}> 
                <CreateUser observer={updateView}/>
            </ModalWrapper>
        </div>      
    );
}

export default UsersView;