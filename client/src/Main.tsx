import { Route, Routes } from "react-router-dom";
import AddCustomer from "./components/customers/AddCustomer";
import ViewCustomers from "./components/customers/ViewCustomers";
import Home from "./components/Home";
import Login from "./components/Login";
import OrdersView from "./components/orders/ViewOrders";
import RegisterUser from "./components/Register";
import ViewVehicles from "./components/vehicles/ViewVehicles";
import "./style/temporary.css";
import { ROUTES } from "./api/routes";


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
                element={<RegisterUser/> }
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


        </Routes>
    );
}