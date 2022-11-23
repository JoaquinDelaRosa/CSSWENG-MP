import styles from 'styled-components';
import delIcon from '../style/images/trash-icon.png'

const DeleteContainer = styles.div`

    > button {
        background-color: var(---tableprimary);
        color: white;
        border: none;
        width: 4.5rem;
        border-radius: 35px;
        padding: 1rem 1.5rem;
        font-size: large;
    }
`

const DelIcon = styles.div`
    background:  url(${delIcon});;
    background-size: cover;
    width: 1.3rem;
    height: 1.6rem;
    border: 0;
`

const ExpDelContainer = styles.div`

    > button {
        background-color: var(---tableprimary);
        color: white;
        border: none;
        width: 4.5rem;
        border-radius: 35px;
        padding: 1rem 1.5rem;
        font-size: large;
    }
`

const ExpDelIcon = styles.div`
    background:  url(${delIcon});;
    background-size: cover;
    width: 1.2rem;
    height: 2rem;
    border: 0;
`

export {DeleteContainer, DelIcon, ExpDelContainer, ExpDelIcon}