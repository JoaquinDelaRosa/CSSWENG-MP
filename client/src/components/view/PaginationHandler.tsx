const LIMIT = 1;

export const PaginationHandler = (props: {
    count : number,
    limit: number, 
    currentPage: number, 
    setCurrentPage: Function}) => {

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
            setCurrentPage((page : number) => page + lastPage);
        }
        else if(skipAhead && currentPage + 10 < recordCount){
            setCurrentPage((page: number) => page + 10);
        }
        else if(!skipAhead && currentPage + 1 <= recordCount){
            setCurrentPage((page: number) => page + 1);
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
            setCurrentPage((page: number) => page - 10);
        }
        else if(!skipAhead && currentPage - 1 > 0){
            setCurrentPage((page: number) => page - 1);
        }
    }
    

    return (
        <>
            <span>
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
            </span>
        </>
    );
}