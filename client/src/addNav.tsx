import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from './components/Navbar';
import Searchbar from "./components/Searchbar";

export const WithNav = () => {
    return (
      <div>
        <Navbar/>
        <Outlet/>
      </div>
    );
};