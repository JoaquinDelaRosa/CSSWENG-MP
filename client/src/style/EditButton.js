import styles from 'styled-components';

const EditButton = styles.div`
    div > .createBtn {
        background-color: var(---tableprimary);
        height: 3.5rem;
        color: white;
        border: none;
        font-size: large;
    }

    .createBtn:hover{
        background-color: var(---transitionhover);
    }
`

export {EditButton}