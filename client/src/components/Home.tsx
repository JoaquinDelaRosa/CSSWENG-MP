import "../style/HomeStyle.css"

const Button = (props: {buttonName : string}) => {
    return (

        <span className="button">
            <button> {props.buttonName} </button>
        </span>
    )
}

const Home = () => {

    return (
    
        <header className="NavWrapper">
            <div className="Navbar">
                <div className="LogoWrapper">
                    <div className="Logo"></div>
                </div>
                <div className="ButtonWrapper">
                    <Button buttonName={"Orders"}/>
                    <Button buttonName={"Customers"}/>
                    <Button buttonName={"Vehicles"}/>
                    <Button buttonName={"Users"}/>
                </div>
            </div>
        </header>
    );
}

export default Home;