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
import { ROUTES } from "./api/routes.";


export const Main = (props: AppState) => {
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

            <Route 
                path={ROUTES.invoices }
                element={<ViewInvoices/> }
            />

        </Routes>
    );
}