export function isEmpty(value: any):boolean {
    return (
        value === undefined || value === null ||
        (typeof value === 'object' && Object.keys(value).length === 0) ||
        (typeof value === 'string' && value.trim().length === 0)
    );
}

export function dateFormat(date:string) :string {

    return new Date(date).toLocaleString();

}