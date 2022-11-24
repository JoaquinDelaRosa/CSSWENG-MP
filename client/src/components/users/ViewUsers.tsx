import { useEffect, useState } from "react";
import { CreateUser } from "./CreateUser";
import { User } from "./UserDetails";
import { UserRecord } from "./UserRecord";
import { ViewHandler } from "../view/ViewHandler";
import { isRole } from "../../utils/CheckRole";
import { OptionButton } from "../../style/SearchbarStyle";
import { TableBody, TableHead } from "../../style/TableStyle";
import { CreateButton } from "../../style/CreateButton";
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
        <div>
            <ViewHandler 
                path={ENDPOINTS.filterUser} 
                all={ENDPOINTS.users} 
                setData={setQueryResult} 
                queryParser={queryParser} 
                flag ={flag}
                options = {[
                    {name: "username", description:"The username of the user"},
                ]}>
            <br />
                <table>
                    <TableHead>
                        <tr>
                            <th> First Name </th>
                            <th> Last Name</th>
                            <th> Username 
                                <OptionButton onClick={() => {
                                    sortAlphabetically(true);
                                }}>▲</OptionButton>
                                <OptionButton onClick={() => {
                                    sortAlphabetically(false);
                                }}>▼</OptionButton>
                            </th>
                            <th> Role </th>
                            
                            <th hidden={isRole("VIEW") || isRole("VIEW_EDIT")}></th>
                            <th hidden={isRole("VIEW") || isRole("VIEW_EDIT")}></th>
                        </tr>
                    </TableHead>

                    <TableBody>
                        {users.map((value, index) => {
                            return (<UserRecord user={value} key={index} rerenderFlag={() => {setFlag(!flag)}}/>);
                        })}
                    </TableBody>
                </table>
                <br />

                <CreateButton hidden={isRole("VIEW") || isRole("VIEW_EDIT")}>
                    <CreateUser observer={updateView}/>
                </CreateButton> 
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