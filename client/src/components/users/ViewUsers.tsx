import { useEffect, useState } from "react";
import { createAPIEndpoint, ENDPOINTS } from "../../api";
import { ModalWrapper } from "../ModalBase";
import { CreateUser } from "./CreateUser";
import { User } from "./UserDetails";
import { UserRecord } from "./UserRecord";
import "../../style/TablesView.css";
import {Searchbar} from "../Searchbar";

const UsersView = () => {

    const [users, setUsers] = useState([]);
    const [queryResult, setQueryResult] = useState([]);

    const fetchUsers = () => {
        createAPIEndpoint(ENDPOINTS.users).fetch()
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
        setUsers(queryResult);
    }, [queryResult]);

    const sortAlphabetically = (isAsc: Boolean ) => {
        if(isAsc){
            users.sort((a : User, b : User) => {
                let fa = a.username.toLowerCase(),
                    fb = b.username.toLowerCase();

                if (fa < fb) {
                    return -1;
                }
                if (fa > fb) {
                    return 1;
                }
                return 0;
            })
        }
        else{
            users.sort((a : User, b : User) => {
                let fa = a.username.toLowerCase(),
                    fb = b.username.toLowerCase();

                if (fa < fb) {
                    return 1;
                }
                if (fa > fb) {
                    return -1;
                }
                return 0;
            })
        }

        setQueryResult([...users]);
    };

    return (
        <div className="FullPage">
            <Searchbar path={ENDPOINTS.filterUser} setData={setQueryResult} queryParser={queryParser} 
                options = {[
                    {name: "username", description:"The username of the the user"},
                    {name: "firstName", description: "The first name of the user"},
                    {name: "lastName", description: "The last name of the user"}
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
                            <th> Username
                                <button onClick={() => {
                                    sortAlphabetically(true);
                                }}>▲</button>

                                <button onClick={() => {
                                    sortAlphabetically(false);
                                }}>▼</button>  
                            </th>
                            <th> Role </th>
                        </tr>
                    </thead>

                    <tbody className="tbodyDiv">
                        {users.map((value, index) => {
                            return (<UserRecord user={value} key={index } />);
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
        name: "",
        skip: 0,
        limit: 1000,
        email: "",
        mobileNumber: "",
    };

    for(let i = 0; i < toks.length; ++i){
        const token = toks[i].trim();
        if (token === "name"){
            query.name = toks[i + 1]?.trim();
        }
        else if (token === "mobileNumber"){
            query.mobileNumber = toks[i + 1]?.trim();
        }
        else if (token === "email"){
            query.email = toks[i + 1]?.trim();
        }
        ++i;
    }

    return query;
}

export default UsersView;