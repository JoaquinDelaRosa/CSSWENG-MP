
import "../style/SearchBar.css"


const Searchbar = () => {
    return (
        <div className="searchWrapper">
            <form autoComplete="off">
                <input  className="searchBar" placeholder="Search" />
            </form>
        </div>
    )
}

export default Searchbar