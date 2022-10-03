export default interface PersonName {
    firstName: string,
    lastName: string,
    middleName?: string
}

export const makeName = (name: PersonName): string => {
    return name.firstName + " " +
        (name.middleName == null ? "" : name.middleName + " ") +
        name.lastName;
}