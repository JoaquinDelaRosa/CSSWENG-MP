import { useEffect, useState } from "react";
import { createAPIEndpoint, ENDPOINTS } from "../../api";
import { ModalWrapper } from "../ModalBase";
import { CreateUser } from "./CreateUser";
import { User } from "./UserDetails";
import { UserRecord } from "./UserRecord";
import "../../style/TablesView.css";
import { Searchbar } from "../Searchbar";

const UsersView = () => {

    const [users, setUsers] = useState([]);
    const [queryResult, setQueryResult] = useState([]);

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

    useEffect(() => {
        fetchUsers();
    }, []);

    const updateView = () => {
        fetchUsers();
    }

    useEffect(() => {
        setUsers(queryResult)
    }, [queryResult])

    return (
        <div className="FullPage">
            <Searchbar path={ENDPOINTS.filterUser} setData={setQueryResult} queryParser={queryParser} 
                options = {[
                    {name: "username", description:"The username of the user"},
                ]}/>
            <br />
            <div className="objectView">
                <table className="tableDiv">
                    <thead>
                        <tr>
                            <th/>
                            <th/>
                            <th> First Name </th>
                            <th> Last Name</th>
                            <th> Username </th>
                            <th> Role </th>
                        </tr>
                    </thead>

                    <tbody className="tbodyDiv">
                        {users.map((value, index) => {
                            return (<UserRecord user={value} key={index }/>);
                        })}
                    </tbody>
                </table>
                
                <ModalWrapper front={"Create User"}> 
                    <CreateUser observer={updateView}/>
                </ModalWrapper>
            </div>    
        </div>  
    );
}

const queryParser = (q : string) => {
    const toks = q.split(':');
    const query = {
        username: "",
        skip: 0,
        limit: 1000,
    };

    for(let i = 0; i < toks.length; ++i){
        const token = toks[i].trim();
        if (token === "username"){
            query.username = toks[i + 1]?.trim();
        }
        ++i;
    }

    return query;
}

export default UsersView;