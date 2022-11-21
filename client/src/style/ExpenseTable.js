import styles from 'styled-components';

const TableWrapper = styles.div`

    > table {
        color: white;
        width: 100%;
        font-size: 16px;
        border-collapse: collapse;
        margin-left: auto;
        margin-right: auto;
        text-align: center;
        border-collapse:separate;
        border:solid black 1px;
        border-radius:6px;
    }
`

const TableHead = styles.thead`
    height: 5rem;

    tr {
        border: 2px #380404;
        height: 3rem;
        border-collapse: collapse;
        background-color: var(---accent);
    }

    tr > th {
        width: 3rem;
        border: 1px var(---accent) solid;
    }
`


const TableBody = styles.tbody`
    background-color: var(---tablecolor);
   
    > tr > td {
        border: 1px var(---tableprimary) solid;
        padding: 0.5rem;
    }
`

export {TableWrapper, TableHead, TableBody}