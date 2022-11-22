
import { OptionButton } from "../../style/SearchbarStyle";

export interface SearchOption {
    name : string,
    description: string,
    tag? : string
}

export const SearchOptionBar = (props : {option : SearchOption, observer: Function})  => {
    return (
        <span>
            <OptionButton onClick={() => {
                if (!props.option.tag) {
                    props.observer(props.option.name + ": ")
                }
                else {
                    props.observer(props.option.tag)
                }
            }}> 
            {props.option.name} </OptionButton> 
        </span>
    );
}