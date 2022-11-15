export const DeleteExpenses = (props : {observer : Function, index : number}) => {
    const onClick = () => {
        props.observer(props.index)
    }

    return (
        <div>
            <button onClick={onClick}> Delete </button>
        </div>
    );
} 