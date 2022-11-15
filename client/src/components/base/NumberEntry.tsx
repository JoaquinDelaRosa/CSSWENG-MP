export const NumberEntry = (props : {number : number}) => {
    return (
        <>
            <p> Amount: {isNaN(parseFloat(props.number.toString())) ? 0.00 : 
            parseFloat(props.number.toString()).toFixed(2)}</p>
        </>
    )
}