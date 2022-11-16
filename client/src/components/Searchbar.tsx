
import { useCallback, useEffect, useState } from "react";
import { createAPIEndpoint } from "../api"
import "../style/SearchBar.css"

export interface SearchOption {
    name : string,
    description: string,
    tag? : string
}

const LIMIT = 25;

const SearchOptionBar = (props : {option : SearchOption, observer: Function})  => {
    return (
        <span>
            <button onClick={() => {
                if (!props.option.tag) {
                    props.observer(props.option.name + ": ")
                }
                else {
                    props.observer(props.option.tag)
                }
            }}> 
            {props.option.name} </button> 
        </span>
    );
}

export const Searchbar = (props : {
    setData: Function, 
    path : string, 
    all : string,
    queryParser : Function, options : Array<SearchOption>,
    children?: any,
    flag : boolean
}) => {

    const [query, setQuery] = useState<string>("");
    const [isVisible, setIsVisible] = useState<boolean>(false);

    const [currentPage, setCurrentPage] = useState(1);
    const [skip, setSkip] = useState(0);
    const [count, setCount] = useState(0);


    const appendQuery = (val : string) => {
        if (query === "")
            setQuery(query + " " + val);
        else 
            setQuery(query + ", " + val);
    }

    const runQuery = useCallback(() => {
        if (query === ""){
            createAPIEndpoint(props.all).fetch({skip : skip, limit : LIMIT})
            .then((response) => {
                props.setData(response.data.data);

                const c = response.data.count;
                setCount(c);
                if (c < skip) {
                    setCurrentPage(Math.ceil(c / LIMIT))
                }
            })
        }
        else {
            createAPIEndpoint(props.path).fetch({...props.queryParser(query.trim()), skip: skip, limit : LIMIT})
            .then((response) => {
                props.setData(response.data.data);

                const c = response.data.count;
                setCount(c);
                if (c < skip) {
                    setCurrentPage(Math.ceil(c / LIMIT))
                }
            })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query, skip, props.flag]);

    useEffect(() => {
        setQuery(query);
        setSkip(skip);
        runQuery();
    }, [query, runQuery, skip])

    

    const nextPage = (skipAhead: Boolean) => {
        const recordCount = Math.ceil(count/LIMIT);

        if(currentPage === recordCount){
            console.log("end of results");
        }
        else if(skipAhead && currentPage + 10 > recordCount){
            const lastPage = recordCount - currentPage 
            setCurrentPage((page) => page + lastPage);
        }
        else if(skipAhead && currentPage + 10 < recordCount){
            setCurrentPage((page) => page + 10);
        }
        else if(!skipAhead && currentPage + 1 <= recordCount){
            setCurrentPage((page) => page + 1);
        }
    }
  
    const previousPage = (skipAhead: Boolean) => {
        if(currentPage === 1){
            console.log("start of results");
        }
        else if(skipAhead && currentPage - 10 < 1){
            setCurrentPage(1);
        }
        else if(skipAhead && currentPage - 10 > 0){
            setCurrentPage((page) => page - 10);
        }
        else if(!skipAhead && currentPage - 1 > 0){
            setCurrentPage((page) => page - 1);
        }
    }
    
    useEffect(() => {
        setSkip((currentPage-1) * LIMIT)
    }, [currentPage]);

    return (
        <div className="searchWrapper">
            <input  className="searchBar searchField" placeholder="Search" value={query} onChange={(e) => {setQuery(e.target.value)}} onClick={() => {setIsVisible(true)}}/>
            {isVisible && props.options.map((value, index) => {
                return ( 
                    <SearchOptionBar option={value} observer={appendQuery} key={index + 1}/> 
                )})
            }

            {props.children}

            <span>
                <button onClick={() => {
                    previousPage(true)
                }}>⮜⮜</button>
                <button onClick={() => {
                    previousPage(false)
                }}>
                        ⮜
                </button>

                <p>{currentPage}</p>

                <button onClick={() => {
                    nextPage(false)
                }}>
                        ⮞
                </button> 
                <button onClick={() => {
                    nextPage(true)
                }}>⮞⮞</button> 
            </span>
        </div>
    )
}