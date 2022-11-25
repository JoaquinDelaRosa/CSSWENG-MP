export const ConvertDate = (date : Date) => {
    return date.toISOString().split("T")[0]
}