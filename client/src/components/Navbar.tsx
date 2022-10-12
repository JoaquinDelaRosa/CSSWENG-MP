import { useNavigation } from "react-router-dom";
import AppState from "../utils/AppState";

const routes = {
    'login': '/login',
    'customers' : '/customers'
}


const Navbar = (state: AppState) => {
    const natvigation = useNavigation();

    return (
        <div>
            

        </div>        
     );
}

export default Navbar;