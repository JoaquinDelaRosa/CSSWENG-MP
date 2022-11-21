import styles from 'styled-components';

const Modal = styles.div`
    font: 'Montserrat';
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: var(--dark1);
    display: flex;
    align-items: center;
    justify-content: center;

    > .modalBackground {
        background-color: #5a0707;
        border-radius: 15px;
        height: 27rem;
        width: 40rem;
        overflow-y: auto;
    }
`

const ModalContent = styles.div`
    align-items: center;
    padding: 10px;
    color: white;
`

const ModalButton = styles.button`
    background-color: var(---tableprimary);
    color: white;
    border: none;
    border-radius: 34px;
    padding: 0.1rem 1rem;
    font-size: 0.8vw;
    width: -moz-fit-content;
    width: fit-content;
`

const CloseButton = styles.thead`

`

export {ModalButton, CloseButton, Modal, ModalContent}