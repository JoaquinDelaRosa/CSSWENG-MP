import { useNavigate } from "react-router-dom";
import { ROUTES } from "../api/routes";

import { Nav, NavButtons, NavSeparator } from "../style/NavStyle";

const Button = (props: {buttonName : string, to: string}) => {
    const navigation = useNavigate();
    return (
        <button onClick={(e) => {e.preventDefault(); navigation(props.to);}}> 
            {props.buttonName} 
        </button>
    )
}

const Navbar = () => {
    return (
        <Nav>
            <nav>
                <img src={require("../style/images/TOPTECH_AUTOWORKS_LOGO.png")} alt="logo"></img>
                <NavButtons>
                    <Button buttonName={"Orders"} to={ROUTES.orders}/>
                    <Button buttonName={"Customers"} to={ROUTES.customers}/>
                    <Button buttonName={"Vehicles"} to={ROUTES.vehicles}/>
                    <Button buttonName={"Users"} to={ROUTES.users}/>
                    <Button buttonName={"Logout"} to={ROUTES.logout}/>
                </NavButtons>
            </nav>
            <NavSeparator></NavSeparator>
        </Nav>
        
    );
}

export default Navbar;