import { Route, Routes } from "react-router-dom";
import AddCustomer from "./components/customers/AddCustomer";
import ViewCustomers from "./components/customers/ViewCustomers";
import Home from "./components/Home";
import Login from "./components/Login";
import OrdersView from "./components/orders/ViewOrders";
import RegisterUser from "./components/RegisterUser";
import ViewVehicles from "./components/vehicles/ViewVehicles";
import AppState from "./utils/AppState";

export const Main = (props: AppState) => {
    return (
        <Routes>
            <Route
                path="/"
                element={<ViewCustomers />}
            />

            <Route
                path="/login"
                element={<Login/>}
            />

            <Route
                path="/register"
                element={<RegisterUser/> }
            />

            <Route
                path="/customers"
                element={<ViewCustomers /> }
            />

            <Route 
                path="/vehicles"
                element={<ViewVehicles/> }
            />

            <Route
                path="/orders"
                element={ <OrdersView/>}
            />

            <Route
                path="/addcustomer"
                element={<AddCustomer/> }
            />

        </Routes>
    );
}