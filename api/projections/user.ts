export const makeUserView = (document) => {
    return {
        username: document.username
    }
}

export const makeUserArrayView = (documents) => {
    return documents.map((val) => {
        return makeUserView(val)
    })
}