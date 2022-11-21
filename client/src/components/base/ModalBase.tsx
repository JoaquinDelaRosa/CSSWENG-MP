import { useEffect, useState } from "react";


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
                        <i>&nbsp;</i>
                        {props.front}
                    </button>
                </div>
            )}
            {isVisible && (
            <div onClick={() => {cancel();}}> 
                <div onClick={(e) => {e.stopPropagation();}}>
                    <div>
                        <div>
                            <button onClick={() => {cancel()}}>X</button>
                        </div>
                        {props.children}
                    </div>
                </div>
            </div>
            )}
        </>
    );
}