
import { useCallback, useEffect, useState } from "react";
import { createAPIEndpoint } from "../../api"

import { MainWrapper } from "../../style/MainWrapperStyle";
import { TableWrapper } from "../../style/TableStyle";
import { LIMIT, PaginationHandler } from "./PaginationHandler";
import { SearchBar } from "./SearchBar";
import { SearchOption } from "./SearchOptionsBar";

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
    const [skip, setSkip] = useState(0);
    const [count, setCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);


    const appendQuery = (val : string) => {
        if (query === "")
            setQuery(query + " " + val);
        else {
            setQuery(query + ", " + val);
        }
    }

    const runQuery = useCallback(() => {
        if (query === ""){
            createAPIEndpoint(props.all).fetch({skip : skip, limit : LIMIT})
            .then((response) => {
                props.setData(response.data.data);
                
                console.log(response);
                const c = response.data.count;
                setCount(c);
            })
        }
        else {
            createAPIEndpoint(props.path).fetch({...props.queryParser(query.trim()), skip: skip, limit : LIMIT})
            .then((response) => {
                props.setData(response.data.data);

                console.log(response);
                const c = response.data.count;
                console.log(c);
                setCount(c);
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
        setSkip((currentPage-1) * LIMIT);
    }, [currentPage]);

    useEffect(() => {
        setCurrentPage(1);
    }, [count]);

    return (
        <MainWrapper>
            <SearchBar appendQuery={appendQuery}
                options={props.options}
                query={query}
                setQuery={setQuery}
            />
            <TableWrapper>
                {props.children}
            </TableWrapper>
            
            <PaginationHandler count={count}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />

        </MainWrapper>
    )
}