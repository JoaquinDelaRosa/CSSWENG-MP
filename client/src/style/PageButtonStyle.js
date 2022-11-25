import styles from 'styled-components';

const PageButtonWrapper = styles.div`
    padding-left: 1rem;
    font-weight: 800;
    text-align: left;
    margin-top: -0.75rem;
    > p {
        display: inline-block;
        padding: 1em;
    }

    > button {
        background-color: var(---tableprimary);
        color: white;
        border-radius: 5px;
        border: none;
        margin: auto 1px auto 1px;
        width: 5rem;
        height: 2rem;

    }

    button:hover{
        background-color: var(---transitionhover);
    }
`

export default PageButtonWrapper;