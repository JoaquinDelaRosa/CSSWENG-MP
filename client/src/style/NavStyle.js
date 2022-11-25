import styles from 'styled-components';

const Nav = styles.header`
    position: static;
    top: 0;
    left: 0;
    width: 100%;
    height: 5em;
    z-index: 100;
    margin-bottom: 1.5em;

    > nav {
        background-color: #eeeff1;
        display: flex;
        flex-direction: row;
        height: 120%;
        width: 100%;
    } 
`

const NavButtons = styles.div`
    overflow: hidden;
    white-space: nowrap;
    display: flex;
    height: 100%;
    flex-direction: row;
    left: 60vw;
    justify-content: space-between;
    position: sticky;

    > button {
        background-color: #eeeff1;
        border: none;
        color: var(---accent);
        font-weight: 600;
        font-size: 1.6em;
        text-align: center;
        text-decoration: none;
        padding: 0.7rem 1.3rem;
        transition: 1s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }

    > button:hover {
        background-color: var(---accent);
        color: rgb(255,255,255);
}
    }
`

const NavSeparator = styles.div`
    width: 100%;
    height: 18%;
    background-color: var(---accent);
    position: relative;
`

export {NavButtons, Nav, NavSeparator};