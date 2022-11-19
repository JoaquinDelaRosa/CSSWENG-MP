import { useState } from "react";
import { SearchOption, SearchOptionBar } from "./SearchOptionBar";

export const SearchBar = (props : {
    query: string, setQuery: Function, appendQuery: Function
    options: Array<SearchOption>}) => {

    const [isVisible, setIsVisible] = useState<boolean>(false);

    return (
        <>
            <input  className="searchBar searchField" 
                placeholder="Search" 
                value={props.query} 
                onChange={(e) => {
                    props.setQuery(e.target.value)}
                } 
                onClick={() => {
                    setIsVisible(true)
                }}/>

                {isVisible && props.options.map((value, index) => {
                return ( 
                    <SearchOptionBar option={value} observer={props.appendQuery} key={index + 1}/> 
                )})
            }
        </>
    );
}