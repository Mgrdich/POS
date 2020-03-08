export function whiteListFilterObj(obj: object, whiteList: Array<string>) {
    return Object.keys(obj).reduce(function (acc:object, curr: string) {
            let o: object = {...acc};
            if (whiteList.includes(curr)) {
                o[curr] = obj[curr];
            }
            return o;
        }
        , {});
}

export function blackListFilterObj(obj: object, blackList: Array<string>) {
    return Object.keys(obj).reduce(function (acc:object, curr: string) {
            let o: object = {...acc};
            if (!blackList.includes(curr)) {
                o[curr] = obj[curr];
            }
            return o;
        }
        , {});
}