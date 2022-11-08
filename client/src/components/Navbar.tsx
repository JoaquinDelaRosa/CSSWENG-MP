import { useNavigate } from "react-router-dom";
import { ROUTES } from "../api/routes";
import "../style/NavStyle.css"

const Button = (props: {buttonName : string, to: string}) => {
    const navigation = useNavigate();
    return (
        <button className="navButton" onClick={(e) => {e.preventDefault(); navigation(props.to)}}> {props.buttonName} </button>
    )
}

const Navbar = () => {
    
    return (
        <header className="NavWrapper">
            <nav className="Navbar">
                <img className="Logo" src={require("../style/images/TOPTECH AUTOWORKS LOGO.png")} alt="logo"></img>
                <div className={"ButtonWrapper"}>
                    <Button buttonName={"Orders"} to={ROUTES.orders}/>
                    <Button buttonName={"Customers"} to={ROUTES.customers}/>
                    <Button buttonName={"Vehicles"} to={ROUTES.vehicles}/>
                    <Button buttonName={"Users"} to={ROUTES.orders}/>
                </div>
            </nav>
            <div className="RedBar"></div>
        </header>
        
    );
}

export default Navbar;