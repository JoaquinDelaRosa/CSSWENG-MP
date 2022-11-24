import { useEffect, useState } from "react";
import { CloseModal, Modal, ModalButton, ModalContent } from "../../style/ModalStyle";


export const ModalWrapper = (props : {front : any, children : any, isVisible : boolean, setIsVisible: Function}) => {

    let [isVisible, setIsVisible] = [props.isVisible, props.setIsVisible];

    const cancel = () => {
        setIsVisible(false);
    }

    useEffect(() => {
        function handleEscapeKey(event: KeyboardEvent) {
            if (event.code === 'Escape') {
                cancel();
            }
        }
        
        document.addEventListener('keydown', handleEscapeKey);
        return () => document.removeEventListener('keydown', handleEscapeKey);
      }, [])

    if (!isVisible) {
        return (
            <>
                <div> 
                    <ModalButton className="createBtn" onClick={() => {setIsVisible(true)}}> 
                        <i className="icon"></i>
                        {props.front}
                    </ModalButton>
                </div>
            </>
        );
    }
    else {
        return (
            <>
                <Modal onClick={() => {cancel();}}> 
                    <div className="modalBackground" onClick={(e) => {e.stopPropagation();}}>
                        <ModalContent>
                            <CloseModal>
                                <button onClick={() => {cancel()}}>X</button>
                            </CloseModal>
                            {props.children}
                        </ModalContent>
                    </div>
                </Modal>
            </>
        )
    }
}