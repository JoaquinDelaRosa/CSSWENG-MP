export const NumberEntry = (props : {number : number}) => {
    return (
        <>
            {isNaN(parseFloat(props.number.toString())) ? 0.00 : 
            parseFloat(props.number.toString()).toFixed(2)}
        </>
    )
}