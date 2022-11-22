import PageButtonWrapper from "../../style/PageButtonStyle";

export const LIMIT = 1;

export const PaginationHandler = (props : {
    count: number ,
    currentPage: number ,
    setCurrentPage: Function
}) => {
    
    const count = props.count;
    const currentPage = props.currentPage;
    const setCurrentPage = props.setCurrentPage;

    const moveToNextPage = (skipAhead: Boolean) => {
        const recordCount = Math.ceil(count/LIMIT);

        if(currentPage === recordCount){
            console.log("end of results");
        }
        else if(skipAhead && currentPage + 10 > recordCount){
            const lastPage = recordCount - currentPage 
            setCurrentPage(lastPage);
        }
        else if(skipAhead && currentPage + 10 < recordCount){
            setCurrentPage(currentPage + 10);
        }
        else if(!skipAhead && currentPage + 1 <= recordCount){
            setCurrentPage(currentPage + 1);
        }
    }
  
    const moveToPreviousPage = (skipAhead: Boolean) => {
        if(currentPage === 1){
            console.log("start of results");
        }
        else if(skipAhead && currentPage - 10 < 1){
            setCurrentPage(1);
        }
        else if(skipAhead && currentPage - 10 > 0){
            setCurrentPage(currentPage - 10);
        }
        else if(!skipAhead && currentPage - 1 > 0){
            setCurrentPage(currentPage - 1);
        }
    }

    return (
        <PageButtonWrapper>
            <button onClick={() => {
                moveToPreviousPage(true)
            }}>⮜⮜</button>
            <button onClick={() => {
                moveToPreviousPage(false)
            }}>
                    ⮜
            </button>

            <p>{currentPage}</p>

            <button onClick={() => {
                moveToNextPage(false)
            }}>
                    ⮞
            </button> 
            <button onClick={() => {
                moveToNextPage(true)
            }}>⮞⮞</button> 
        </PageButtonWrapper>
    )
}