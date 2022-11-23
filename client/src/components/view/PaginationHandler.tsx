import { useEffect, useState } from "react";
import PageButtonWrapper from "../../style/PageButtonStyle";

export const LIMIT = 2;

export const PaginationHandler = (props : {
    count: number ,
    currentPage: number ,
    setCurrentPage: Function
}) => {
    const [count, setCount] = useState(props.count);
    const [currentPage, setCurrentPage] = [props.currentPage, props.setCurrentPage]

    useEffect(() => {
        setCount(props.count);
    }, [props.count])

    const jumpToPage = (jump: number) => {
        if (currentPage + jump < 1){
            setCurrentPage(1);
        }
        else if (currentPage + jump > Math.ceil(count / LIMIT)) {
            setCurrentPage(Math.ceil(count / LIMIT));
        }
        else {
            setCurrentPage(currentPage + jump);
        }
    }

    return (
        <PageButtonWrapper>
            <button onClick={() => {
                jumpToPage(-10)
            }}>⮜⮜</button>
            <button onClick={() => {
                jumpToPage(-1)
            }}>
                    ⮜
            </button>

            <p>{currentPage}</p>

            <button onClick={() => {
                jumpToPage(1)
            }}>
                    ⮞
            </button> 
            <button onClick={() => {
                jumpToPage(10)
            }}>⮞⮞</button> 
        </PageButtonWrapper>
    )
}