
import { time } from "console";
import { useEffect, useState } from "react";
import { createAPIEndpoint } from "../api"
import "../style/SearchBar.css"
import { ModalWrapper } from "./ModalBase"

export interface SearchOption {
    name : string,
    description: string,
}

const SearchOptionBar = (props : {option : SearchOption, observer: Function})  => {
    return (
        <button className="optionButton" onClick={() => {
            props.observer(props.option.name + ": ")
        }}> 
        {props.option.name} </button> 
    );
}

export const Searchbar = (props : {
    setData: Function, 
    path : string, 
    queryParser : Function, options : Array<SearchOption>,
}) => {

    const [query, setQuery] = useState<string>("");
    const [isVisible, setIsVisible] = useState<boolean>(false);

    const runQuery = () => {
        console.log(query);
        createAPIEndpoint(props.path).fetch(props.queryParser(query.trim()))
        .then((response) => {
                console.log(response);
                props.setData(response.data);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    const appendQuery = (val : string) => {
        setQuery(query + " " + val);
    }

    useEffect(() => {        
        setQuery(query)
        function handleEnterKey(event: KeyboardEvent) {
            if (event.code === 'Enter') {
                runQuery();
            }
        }
        
        document.addEventListener('keydown', handleEnterKey)
        return () => document.removeEventListener('keydown', handleEnterKey)
      }, [query])

    
    return (
        <div className="searchWrapper">
            <input  className="searchBar" placeholder="Search" defaultValue={query} 
            onChange={(e) => {setQuery(e.target.value)}} 
            onClick={() => {setIsVisible(true)}}/>
            <span className="options">
                {isVisible && props.options.map((value, index) => {
                        return ( 
                            <SearchOptionBar option={value} observer={appendQuery} key={index + 1}/> 
                        )
                    })
                }
            </span>
        </div>
    )
}