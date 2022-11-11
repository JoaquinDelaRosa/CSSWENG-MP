export const makeUserView = (document) => {
    if (document == null)
        return {};
    return {
        id : document.id,
        firstName: document.firstName,
        lastName: document.lastName,
        username: document.username,
        role: document.role,
    }
}

export const makeUserArrayView = (documents) => {
    return documents.map((val) => {
        return makeUserView(val)
    })
}