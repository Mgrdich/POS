import {InputField} from "../interfaces/General";

export function isEmpty(value: any): boolean {
    return (
        !!(value === undefined || value === null ||
            (typeof value === 'object' && value["empty"])
            (typeof value === 'object' && Object.keys(value).length === 0) ||
            (typeof value === 'string' && value.trim().length === 0)
        ));
}

export function dateFormat(date: string): string {
    return new Date(date).toLocaleString();
}


export function DefaultValue(myInputFields: Array<InputField>, data: any) {
    return myInputFields.map(function (item: InputField, index: number) {
        item.default = data[item.name];
        return item;
    });
}

export function hashingArray<T>(array: Array<T>, key: string,keyRename?:string):any {
    return array.reduce(function (acc: any, curr: any) {
        let obj: any = {...acc};
        if (curr[key]) {
            let hashedKey:string = curr[key];
            if(keyRename) {
                curr[keyRename] = curr[key];
                delete curr[key];
            }
            obj[hashedKey] = curr;
        }
        return obj;
    }, {});
}