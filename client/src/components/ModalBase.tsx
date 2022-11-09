import { useState } from "react";
import "../style/Modal.css"

export const ModalWrapper = (props : {children : any, name : string}) => {

    const [isVisible, setIsVisible] = useState(false);


    const cancel = () => {
        setIsVisible(false)
    }
    
    return (
        <>
            {!isVisible && (
                <div>
                    <button onClick={() => {setIsVisible(true)}}> {props.name} </button>
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