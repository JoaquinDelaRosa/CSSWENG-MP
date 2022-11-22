import styles from 'styled-components';

const FormDivStyle = styles.div`
    text-align: center;
    overflow: scroll-horizontal;
    height: 30rem;

    p {
        margin: 0;
    }

    div {
        text-align: center;
        width: 100%;
    }

    div:first-child {
        padding-top: 0;
    }

    label {
        overflow: none;
        font-size: 1.1rem;
        padding: 10px 20px 10px;
        float: left;
        clear: left;
        width: 300px;
        height: 20px;
        text-align: left;
    }

    input[type="text"], select, input[type="date"] {
        background-color: var(---tablecolor);
        color: white;
        padding: 5px;
        padding-left: 0.8rem;
        margin: 5px;
        border: none;
        border-radius: 15px;
        width: 10rem;
    }

    input[name="submit"] {
        background-color: var(---submitButton);
        color: white;
        border: none;
        border-radius: 25px;
        padding: 1rem 5rem;
        margin: 0.5rem;
        font-weight: bold;
    }

    input[name="submit"]:hover {
        background-color: rgb(255,255,255,0.1);
        color: white;
    }

`


export {FormDivStyle}