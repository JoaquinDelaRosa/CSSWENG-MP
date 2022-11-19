export const NumberEntry = (props : {number? : number}) => {
    if (props.number) {
        return (
            <>
                {isNaN(parseFloat(props.number.toString())) ? 0.00 : 
                parseFloat(props.number.toString()).toFixed(2)}
            </>
        )
    }
    else {
        return (
            <>
                {"0.00"}
            </>
        );
    }
}