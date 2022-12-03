import { useEffect, useState } from "react";
import { OptionBar, SearchWrapper } from "../../style/SearchbarStyle";
import { SearchOption, SearchOptionBar } from "./SearchOptionsBar";


export const SearchBar = (props :{
    query: string, 
    setQuery: Function,
    appendQuery: Function,
    options: Array<SearchOption>
}) => {

    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [value, setValue] = useState<string>(props.query);

    useEffect(() => {
        setValue(props.query);
    }, [props.query])

    return (
        <SearchWrapper>
        <input placeholder="Search" 
            value={value} 
            onChange={(e) => {
                setValue(e.target.value);
                setTimeout(() => {
                    props.setQuery(e.target.value)}
                , 500);
            }} 
            onClick={() => {
                setIsVisible(true)
            }}/>

            <OptionBar>
                {isVisible && props.options.map((value, index) => {
                    return (
                        <SearchOptionBar option={value} observer={props.appendQuery} key={index + 1}/>
                    )})
                }
            </OptionBar>
        </SearchWrapper>
    );   

}
