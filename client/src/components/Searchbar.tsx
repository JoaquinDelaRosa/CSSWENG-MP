
import { useCallback, useEffect, useState } from "react";
import { createAPIEndpoint } from "../api"
import "../style/SearchBar.css"

export interface SearchOption {
    name : string,
    description: string,
}

const SearchOptionBar = (props : {option : SearchOption, observer: Function})  => {
    return (
        <span>
            <button onClick={() => {
                props.observer(props.option.name + ": ")
            }}> 
            {props.option.name} </button> 
        </span>
    );
}

export const Searchbar = (props : {
    setData: Function, 
    path : string, 
    queryParser : Function, options : Array<SearchOption>,
}) => {

    const [query, setQuery] = useState<string>("");
    const [isVisible, setIsVisible] = useState<boolean>(false);

    const appendQuery = (val : string) => {
        if (query === "")
            setQuery(query + " " + val);
        else 
            setQuery(query + ", " + val);
    }

    const runQuery = useCallback(() => {
        if (query === "")
            return [];

        createAPIEndpoint(props.path).fetch(props.queryParser(query.trim()))
        .then((response) => {
            props.setData(response.data);
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query]);

    useEffect(() => {
        setQuery(query);
        runQuery();
    }, [query, runQuery])

    return (
        <div className="searchWrapper">
            <input  className="searchBar" placeholder="Search" value={query} onChange={(e) => {setQuery(e.target.value)}} onClick={() => {setIsVisible(true)}}/>
            {isVisible && props.options.map((value, index) => {
                return ( 
                    <SearchOptionBar option={value} observer={appendQuery} key={index + 1}/> 
                )})
            }
        </div>
    )
}