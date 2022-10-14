import { Route, Routes } from "react-router-dom";
import AddCustomer from "./components/customers/AddCustomer";
import CustomersView from "./components/customers/CustomersView";
import Home from "./components/Home";
import Login from "./components/Login";
import VehiclesView from "./components/VehiclesView";
import AppState from "./utils/AppState";

export const Main = (props: AppState) => {
    return (
        <Routes>
            <Route
                path="/"
                element={<CustomersView />}
            />

            <Route
                path="/login"
                element={<Login/>}
            />

            <Route
                path="/customers"
                element={<CustomersView/> }
            />

            <Route 
                path="/vehicles"
                element={<VehiclesView/> }
            />

            <Route
                path="/addcustomer"
                element={<AddCustomer/> }
            />

        </Routes>
    );
}