import { Route, Routes } from "react-router-dom";
import CustomersView from "./components/CustomersView";
import Home from "./components/Home";
import Login from "./components/Login";
import VehiclesView from "./components/VehiclesView";
import AppState from "./utils/AppState";

export const Main = (props: AppState) => {
    return (
        <Routes>
            <Route
                path="/"
                element={<Home />}
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

        </Routes>
    );
}