import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import ViewCustomers from "./components/customers/ViewCustomers";
import Home from "./components/Home";
import Login from "./components/Login";
import OrdersView from "./components/orders/ViewOrders";
import Register from "./components/Register";
import ViewVehicles from "./components/vehicles/ViewVehicles";
import "./style/temporary.css";
import { ROUTES } from "./api/routes";
import UsersView from "./components/users/ViewUsers";
import { WithNav } from "./AddNav";
import { useEffect, useState } from "react";
import {Logout} from "./utils/Logout";  



const ProtectedRoute = (props : { isLoggedIn : boolean}) => {
    console.log(props.isLoggedIn)
    if (!props.isLoggedIn) {
      return (<Navigate to="/login"/>);    
    }
    return <Outlet/>
};

export const Main = () => {
    const [isLoggedIn ,setIsLoggedIn] = useState<boolean>(sessionStorage.getItem("isLoggedIn") === "true")

    return (    
        <Routes>
                <>
                    <Route
                    path="/"
                    element={<Login setIsLoggedIn={setIsLoggedIn}/> }
                    />

                    <Route
                        path={ROUTES.login}
                        element={<Login setIsLoggedIn={setIsLoggedIn}/> }
                    />

                    <Route
                        path={ROUTES.register }
                        element={<Register/> }
                    />
                </>
                
      
            
            
            
                <Route element={<WithNav/>}>
                    <Route path={ROUTES.customers} element={<ProtectedRoute isLoggedIn={isLoggedIn}/>}>
                        <Route
                            path={ROUTES.customers }
                            element={<ViewCustomers/> }
                        />
                    </Route>
                    <Route path={ROUTES.vehicles} element={<ProtectedRoute isLoggedIn={isLoggedIn}/>}>
                        <Route
                            path={ROUTES.vehicles }
                            element={<ViewVehicles/> }
                        />
                    </Route>

                    <Route path={ROUTES.orders} element={<ProtectedRoute isLoggedIn={isLoggedIn}/>}>
                        <Route
                            path={ROUTES.orders }
                            element={<OrdersView/> }
                        />
                    </Route>

                    <Route path={ROUTES.users} element={<ProtectedRoute isLoggedIn={isLoggedIn}/>}>
                        <Route
                            path={ROUTES.users }
                            element={<UsersView/> }
                        />
                    </Route>

                    <Route path={ROUTES.home} element={<ProtectedRoute isLoggedIn={isLoggedIn}/>}>
                        <Route
                            path={ROUTES.home}
                            element={<Home/>}
                        />
                    </Route>
                </Route>
            
            

            <Route
                path={ROUTES.logout}
                element={<Logout setIsLoggedIn={setIsLoggedIn}/>}
            />

        </Routes>
    );
}