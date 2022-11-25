import styles from 'styled-components';

const CreateButton = styles.div`
    display: inline-block;
    padding-top: 0.5rem;
    div > .createBtn {
        background-color: var(---createButton);
        color: white;
        border: none;
        border-radius: 35px;
        padding: 1rem 1.5rem;
        width: 14rem;
        font-size: large;
    }
    float: right;
    padding-right: 20px;

    .createBtn:hover{
        background-color: var(---transitionhover);
    }
`

export {CreateButton}