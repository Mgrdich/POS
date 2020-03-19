export function whiteListFilterObj(obj: object, whiteList: Array<string>) {
    return Object.keys(obj).reduce(function (acc: object, curr: string) {
            let o: object = {...acc};
            if (whiteList.includes(curr)) {
                o[curr] = obj[curr];
            }
            return o;
        }
        , {});
}

export function blackListFilterObj(obj: object, blackList: Array<string>) {
    return Object.keys(obj).reduce(function (acc: object, curr: string) {
            let o: object = {...acc};
            if (!blackList.includes(curr)) {
                o[curr] = obj[curr];
            }
            return o;
        }
        , {});
}

export function tableDataNormalize(data: Array<any>, tableObj: any) { //TODO replace it by the created interface //TODO with blacklist idea
    let tableData = data.map(function (item) {
        let objTable: any = {
            _id: item._id
        };
        for (let i = 0; i < tableObj.keys.length; i++) {
            let key = tableObj.keys[i];
            objTable[key] = item[key];
        }
        return objTable;
    });
    return {
        keys: tableObj.keys,
        thead: tableObj.translations,
        tbody: tableData
    };
}

//related to the BE Fetching data from the Server and giving it to the Dropdown
export function normalizeDropDowns(data:Array<any>,property:any) {
    return data.map(function (item) {
        let obj:any = {};
        obj.value = item[property.value];
        obj.placeholder = item[property.placeholder];
        return obj;
    })
}