import {InputField} from "../interfaces/General";

export function isEmpty(value: any): boolean {
    return (
        value === undefined || value === null ||
        (typeof value === 'object' && Object.keys(value).length === 0) ||
        (typeof value === 'string' && value.trim().length === 0)
    );
}

export function dateFormat(date: string): string {
    return new Date(date).toLocaleString();
}


export function DefaultValue(myInputFields: Array<InputField>, data: any) {
    return myInputFields.map((item: InputField, index: number) => {
        item.default = data[item.name];
        return item;
    });
}