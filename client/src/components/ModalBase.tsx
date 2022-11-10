import { useEffect, useState } from "react";
import "../style/Modal.css"

export const ModalWrapper = (props : {front : any, children : any, onSubmit? : Function}) => {
    // TODO REMOVE THE ? on ONSUBMIT and refactor accordingly
    const [isVisible, setIsVisible] = useState(false);

    const cancel = () => {
        setIsVisible(false)
    }
    
    useEffect(() => {
        function handleEscapeKey(event: KeyboardEvent) {
            if (event.code === 'Escape') {
                cancel();
            }
        }
        
        document.addEventListener('keydown', handleEscapeKey)
        return () => document.removeEventListener('keydown', handleEscapeKey)
      }, [])

    return (
        <>
            {!isVisible && (
                <div> 
                    <button onClick={() => {setIsVisible(true)}}> 
                        {props.front}
                    </button>
                </div>
            )}
            {isVisible && (
            <div className="modal" onClick={() => {cancel();}}> 
                <div className="modalBackground" onClick={(e) => {e.stopPropagation();}}>
                    <div className="modalContent">
                        <div className="closeButton">
                            <button onClick={() => {cancel()}}> X </button>
                        </div>
                        {props.children}
                        <button onSubmit={() => props.onSubmit}></button>
                    </div>
                </div>
            </div>
            )}
        </>
    );
}