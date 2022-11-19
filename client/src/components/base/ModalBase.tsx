import { useEffect, useState } from "react";
import "../../style/Modal.css"


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
        
        document.addEventListener('keydown', handleEscapeKey);
        return () => document.removeEventListener('keydown', handleEscapeKey);
      }, [])
    
    if (!isVisible) {
        return (
            <>
                <div className="editBtn"> 
                    <button onClick={() => {setIsVisible(true)}}> 
                        <i className="icon">&nbsp;</i>
                        {props.front}
                    </button>
                </div>
            </>
        );
    }
    else {
        return (
            <>
                <div className="modal" onClick={() => {cancel();}}> 
                    <div className="modalBackground" onClick={(e) => {e.stopPropagation();}}>
                        <div className="modalContent">
                            <div className="closeButton">
                                <button className="modalCreateX"onClick={() => {cancel()}}>X</button>
                            </div>
                            {props.children}
                        </div>
                    </div>
                </div>
            </>
        )
    }
}