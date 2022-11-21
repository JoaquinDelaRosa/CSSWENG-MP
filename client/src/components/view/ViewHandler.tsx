
import { useCallback, useEffect, useState } from "react";
import { createAPIEndpoint } from "../../api"
import "../../style/SearchBar.css"
import { SearchOption } from "./SearchOptionBar";
import { SearchBar } from "./SearchBar";
import { PaginationHandler } from "./PaginationHandler";

const LIMIT = 1;

export const ViewHandler = (props : {
    setData: Function, 
    path : string, 
    all : string,
    queryParser : Function, 
    options : Array<SearchOption>,
    children?: any,
    flag : boolean
}) => {

    const [query, setQuery] = useState<string>("");

    const [currentPage, setCurrentPage] = useState(1);
    const [skip, setSkip] = useState(0);
    const [count, setCount] = useState(0);

    const appendQuery = (val : string) => {
        if (query === "")
            setQuery(query + " " + val);
        else 
            setQuery(query + ", " + val);
    }

    const runQuery = useCallback(async () => {
        if (query === ""){
            await createAPIEndpoint(props.all).fetch({skip : skip, limit : LIMIT})
            .then((response) => {
                const c = response.data.count;
                setCount(c);
                if (c < skip) {
                    setCurrentPage(Math.ceil(c / LIMIT))
                }
                return response.data.data;
            })
            .then((data) => {
                props.setData(data);
            })
        }
        else {
            await createAPIEndpoint(props.path).fetch({...props.queryParser(query.trim()), skip: skip, limit : LIMIT})
            .then((response) => {
                const c = response.data.count;
                setCount(c);
                if (c < skip) {
                    setCurrentPage(Math.ceil(c / LIMIT))
                }
                return response.data.data;
            })
            .then((data) => {
                props.setData(data);
            })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query, skip, props.flag]);

    useEffect(() => {
        setQuery(query);
        setSkip(skip);
        runQuery();
    }, [query, runQuery, skip])


    useEffect(() => {
        setSkip((currentPage-1) * LIMIT)
    }, [currentPage]);

    return (
        <div className="searchWrapper">
            <SearchBar appendQuery={appendQuery}
                options={props.options}
                query={query}
                setQuery={setQuery}
            />

            {props.children}

            <PaginationHandler count={count}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                limit={LIMIT}    
            />
        </div>
    )
}