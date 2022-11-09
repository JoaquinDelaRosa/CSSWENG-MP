export const makeUserView = (document) => {
    return {
        id : document.id,
        firstName: document.firstName,
        lastName: document.lastName,
        username: document.username
    }
}

export const makeUserArrayView = (documents) => {
    return documents.map((val) => {
        return makeUserView(val)
    })
}