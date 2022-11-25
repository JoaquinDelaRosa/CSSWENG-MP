const MONTHS = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export const DateEntry = (props: { date: string }) => {
    const d: Date = new Date(props.date);

    return (
        <>
            {d.valueOf() !== 0 ? MONTHS[d.getMonth()] + " " + d.getDate() + " " + d.getFullYear() : ""}
        </>
    );
}
