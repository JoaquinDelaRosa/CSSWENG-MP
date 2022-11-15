export const NumberEntry = (props : {number? : number}) => {
    return (
        <>
            {
                props.number && 
                <>
                {isNaN(parseFloat(props.number.toString())) ? 0.00 : 
                parseFloat(props.number.toString()).toFixed(2)}
                </>
            }
            {
                !props.number && 
                <>
                    {"0.00"}
                </>
            }
        </>
    ) 
}