import styles from 'styled-components';

const SortButton = styles.span`
    > button {
        background-color: #762721;
        color: white;
        border-radius: 5px;
        border: none;
        margin: 0.5px 1px auto 1px;
        width: 5rem;
        height: 2rem;
    }

    button:hover {
        background-color: var(---sortButtonHover);
    }
`

export {SortButton}