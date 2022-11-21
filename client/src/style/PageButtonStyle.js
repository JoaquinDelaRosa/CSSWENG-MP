import styles from 'styled-components';

const PageButtonWrapper = styles.div`
    text-align: center;
    font-weight: 800;
    
    > p {
        display: inline-block;
        padding: 1em
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
`

export default PageButtonWrapper;