import { ExpDelContainer, ExpDelIcon } from "../../style/DeleteButton";

export const DeleteExpenses = (props : {observer : Function, index : number}) => {
    const onClick = () => {
        props.observer(props.index)
    }

    return (
        <ExpDelContainer>
            <button onClick={onClick}><ExpDelIcon></ExpDelIcon></button>
        </ExpDelContainer>
    );
} 