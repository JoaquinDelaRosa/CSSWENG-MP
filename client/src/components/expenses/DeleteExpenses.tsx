import { DeleteContainer } from "../../style/DeleteButton";

export const DeleteExpenses = (props : {observer : Function, index : number}) => {
    const onClick = () => {
        props.observer(props.index)
    }

    return (
        <DeleteContainer>
            <button onClick={onClick}><i className="deleteIcon"></i> </button>
        </DeleteContainer>
    );
} 