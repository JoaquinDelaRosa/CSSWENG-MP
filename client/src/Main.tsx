import { Route, Routes } from "react-router-dom";
import ViewCustomers from "./components/customers/ViewCustomers";
import Home from "./components/Home";
import Login from "./components/Login";
import OrdersView from "./components/orders/ViewOrders";
import Register from "./components/Register";
import ViewVehicles from "./components/vehicles/ViewVehicles";
import "./style/temporary.css";
import { ROUTES } from "./api/routes";
import UsersView from "./components/users/ViewUsers";
import { Logout } from "./components/vehicles/Logout";


export const Main = () => {
    return (
        <Routes>
            <Route
                path="/"
                element={<Login/> }
            />

            <Route
                path={ROUTES.login}
                element={<Login/> }
            />

            <Route
                path={ROUTES.register }
                element={<Register/> }
            />

            <Route
                path={ROUTES.customers }
                element={<ViewCustomers/> }
            />

            <Route 
                path={ROUTES.vehicles }
                element={<ViewVehicles/> }
            />

            <Route
                path={ROUTES.orders }
                element={<OrdersView/> }
            />

            <Route
                path={ROUTES.users }
                element={<UsersView/> }
            />

            <Route
                path={ROUTES.home}
                element={<Home/>}
            />

            <Route
                path={ROUTES.logout}
                element={<Logout/>}
            />

        </Routes>
    );
}