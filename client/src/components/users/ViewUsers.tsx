import { useEffect, useState } from "react";
import { createAPIEndpoint, ENDPOINTS } from "../../api";
import { ModalWrapper } from "../base/ModalBase";
import { CreateUser } from "./CreateUser";
import { User } from "./UserDetails";
import { UserRecord } from "./UserRecord";
import { Searchbar } from "../Searchbar";
import { isRole } from "../../utils/CheckRole";

const UsersView = () => {

    const [users, setUsers] = useState([]);
    const [queryResult, setQueryResult] = useState([]);

    const [flag, setFlag] = useState(false);

    const updateView = () => {
        setFlag(!flag);
    }

    useEffect(() => {
        setUsers(queryResult)
    }, [queryResult])

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
        <div>
            <Searchbar path={ENDPOINTS.filterUser} all={ENDPOINTS.users} setData={setQueryResult} queryParser={queryParser} flag ={flag}
                options = {[
                    {name: "username", description:"The username of the user"},
                ]}>
            <br />
                <table>
                    <thead>
                        <tr>
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
                            
                            <th hidden={isRole("VIEW") || isRole("VIEW_EDIT")}></th>
                            <th hidden={isRole("VIEW") || isRole("VIEW_EDIT")}></th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.map((value, index) => {
                            return (<UserRecord user={value} key={index} rerenderFlag={() => {setFlag(!flag)}}/>);
                        })}
                    </tbody>
                </table>
                <br />
                <div hidden={isRole("VIEW") || isRole("VIEW_EDIT")}>
                <ModalWrapper front={"Create User"}> 
                    <CreateUser observer={updateView}/>
                </ModalWrapper>
            </div> 
            </Searchbar>   
        </div>  
    );
}

const queryParser = (q : string) => {
    const toks = q.split(',');
    const query = {
        username: "",
        skip: 0,
        limit: 1000,
    };

    for(let i = 0; i < toks.length; ++i){
        const subtoks = toks[i].split(":");
        const key = subtoks[0].trim();
        const value = subtoks[1];

        if (key === "username"){
            query.username = value?.trim();
        }
    }

    return query;
}

export default UsersView;