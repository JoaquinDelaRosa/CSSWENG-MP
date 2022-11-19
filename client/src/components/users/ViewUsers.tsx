import { useEffect, useState } from "react";
import { CreateUser } from "./CreateUser";
import { User } from "./UserDetails";
import { UserRecord } from "./UserRecord";
import "../../style/TablesView.css";
import { ViewHandler } from "../view/ViewHandler";
import "../../style/UsersView.css";
import { isRole } from "../../utils/CheckRole";
import { ENDPOINTS } from "../../api/endpoints";

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
        <div className="FullPage">
            <ViewHandler path={ENDPOINTS.filterUser} 
                all={ENDPOINTS.users} 
                setData={setQueryResult} 
                queryParser={queryParser} 
                flag ={flag}
                options = {[
                    {name: "username", description:"The username of the user"},
                ]}>
            <br />

            <div className="objectView">
                <table className="tableDiv">
                    <thead>
                        <tr>
                            <th className="firstNameCol"> First Name </th>
                            <th className="lastNameCol"> Last Name</th>
                            <th className="usernameCol"> Username 
                                <button onClick={() => {
                                    sortAlphabetically(true);
                                }}>▲</button>

                                <button onClick={() => {
                                    sortAlphabetically(false);
                                }}>▼</button>
                            </th>
                            <th className="roleCol"> Role </th>
                            
                            <th hidden={isRole("VIEW") || isRole("VIEW_EDIT")} className="editCol"></th>
                            <th hidden={isRole("VIEW") || isRole("VIEW_EDIT")} className="delCol"></th>
                        </tr>
                    </thead>

                    <tbody className="tbodyDiv">
                        {users.map((value, index) => {
                            return (
                                <UserRecord user={value} key={index} 
                                    rerenderFlag={() => {
                                        setFlag(!flag)}
                                    }
                                />
                            );
                        })}
                    </tbody>
                </table>

                <br />
                <div hidden={isRole("VIEW") || isRole("VIEW_EDIT")} className="createBtn">
                    <CreateUser observer={updateView}/>
                </div> 
            </div>
            </ViewHandler>   
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