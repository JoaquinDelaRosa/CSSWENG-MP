import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from './components/Navbar';

export const WithNav = () => {
    return (
      <div>
        <Navbar/>
        <Outlet/>
      </div>
    );
};