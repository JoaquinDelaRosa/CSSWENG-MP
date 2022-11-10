
import { createAPIEndpoint } from "../api"
import "../style/SearchBar.css"


const Searchbar = (props : {setData: Function, path : string, queryParser : Function}) => {

    const onClick = () => [
        createAPIEndpoint(props.path).fetch()
        .then((response) => {
                console.log(response);
            }
        )
    ]

    return (
        <div className="searchWrapper">
            <input  className="searchBar" placeholder="Search" />
            <button onClick = {() => {onClick()}}> Search </button>
        </div>
    )
}

export default Searchbar