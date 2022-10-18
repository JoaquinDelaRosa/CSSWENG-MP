import { Route, Routes } from "react-router-dom";
import AddCustomer from "./components/customers/AddCustomer";
import ViewCustomers from "./components/customers/ViewCustomers";
import Home from "./components/Home";
import ViewInvoices from "./components/invoice/ViewInvoices";
import Login from "./components/Login";
import OrdersView from "./components/orders/ViewOrders";
import RegisterUser from "./components/RegisterUser";
import ViewVehicles from "./components/vehicles/ViewVehicles";
import AppState from "./utils/AppState";
import "./style/formEdit.css";


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
                path="/invoices"
                element={<ViewInvoices />}
            />
            <Route
                path="/addcustomer"
                element={<AddCustomer/> }
            />

        </Routes>
    );
}