export const tickFormatFunction = (x: any) => {
    return `AMD${x / 1000}K`
};
export const labelsFunction = (datum: any) => {
    return `price: ${datum}`
};