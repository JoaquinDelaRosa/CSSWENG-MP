
import { useCallback, useEffect, useState } from "react";
import { createAPIEndpoint } from "../api"
import "../style/SearchBar.css"
import { ModalWrapper } from "./ModalBase"

export interface SearchOption {
    name : string,
    description: string,
}

const SearchOptionBar = (props : {option : SearchOption, observer: Function})  => {
    return (
        <div>
            <button onClick={() => {
                props.observer(props.option.name + ": ")
            }}> 
            {props.option.name} </button> 
        </div>
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
        setQuery(query + " " + val);
    }

    const runQuery = useCallback(() => {
        if (query === "")
            return [];

        createAPIEndpoint(props.path).fetch(props.queryParser(query.trim()))
        .then((response) => {
            props.setData(response.data);
        })
    }, [query]);

    useEffect(() => {
        setQuery(query);
        runQuery();
    }, [query, runQuery])

    return (
        <div className="searchWrapper">
            <input  className="searchBar" placeholder="Search" defaultValue={query} onChange={(e) => {setQuery(e.target.value)}} onClick={() => {setIsVisible(true)}}/>
            {isVisible && props.options.map((value, index) => {
                    return ( 
                        <SearchOptionBar option={value} observer={appendQuery} key={index + 1}/> 
                    )
                })
            }
        </div>
    )
}