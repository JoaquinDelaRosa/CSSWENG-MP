const FormError = (props: { error: boolean, message: string }) => {
    if (props.error == false) {
        return <div> </div>
    }

    return (
        <div>
            <p> {props.message}</p>
        </div>
    );
}

export default FormError;