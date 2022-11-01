export const makeUserView = (document) => {
    return {
        userName: document.userName
    }
}

export const makeUserArrayView = (documents) => {
    return documents.map((val) => {
        return makeUserView(val)
    })
}