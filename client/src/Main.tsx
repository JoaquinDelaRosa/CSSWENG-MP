import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
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
        </Routes>
    );
}