import { useEffect, useState } from "react";
import "../style/Modal.css"

export const ModalWrapper = (props : {front : any, children : any}) => {

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
                        {props.children}
                        <button onClick={() => {cancel()}}> Close </button>
                    </div>
                </div>
            </div>
            )}
        </>
    );
}