export const ConvertDate = (date : Date) => {
    try {
        return date.toISOString().split("T")[0];
    }
    catch {
        return "yyyy-mm-dd";
    }
}