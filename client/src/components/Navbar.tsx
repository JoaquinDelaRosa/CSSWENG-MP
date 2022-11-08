import "../style/NavStyle.css"

const Button = (props: {buttonName : string}) => {
    return (
            <button className="navButton"> {props.buttonName} </button>
    )
}

const Navbar = () => {

    return (
        
            <header className="NavWrapper">
                <nav className="Navbar">
                    <img className="Logo" src={require("../style/images/TOPTECH AUTOWORKS LOGO.png")} alt="logo"></img>
                    <div className="ButtonWrapper">
                        <Button buttonName={"Orders"}/>
                        <Button buttonName={"Customers"}/>
                        <Button buttonName={"Vehicles"}/>
                        <Button buttonName={"Users"}/>
                    </div>
                </nav>
                <div className="RedBar"></div>
            </header>
        
    );
}

export default Navbar;