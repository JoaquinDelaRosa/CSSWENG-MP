import { useState } from "react";
import { SearchWrapper } from "../../style/SearchbarStyle";
import { SearchOption, SearchOptionBar } from "./SearchOptionsBar";


export const SearchBar = (props :{
    query: string, 
    setQuery: Function,
    appendQuery: Function,
    options: Array<SearchOption>
}) => {

    const [isVisible, setIsVisible] = useState<boolean>(false);

    return (
        <SearchWrapper>
        <input placeholder="Search" 
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
        </SearchWrapper>
    );   

}
