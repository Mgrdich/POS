import {IClosedOrders} from "../interfaces/models/ClosedOrders";
import {tableTypesNormlizer} from "./constants/enums";
import {formatISO} from 'date-fns'

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

export function tableDataNormalize(data: Array<any>, tableObj: any) { //TODO replace it by the created interface //TODO with blacklist
    //tODO better algorithmic solution

    let tableObjKeys:Array<string> = tableObj.keys.map(function(item:string | any){
        if(typeof item === 'string') {
            return item
        }
        return item.name;
    });

    let tableData = data.map(function (item) {
        let objTable: any = {
            _id: item._id
        };
        for (let i = 0; i < tableObj.keys.length; i++) {
            let key = tableObj.keys[i];
            if(typeof key === 'string') {
                objTable[key] = item[key];
            } else {
                if(!key.type) {
                        objTable[key.name] = item[key.name][key.alias];
                    } else {
                    if(key.type === tableTypesNormlizer.Date) { //TODO converted into switch when it gets bigger
                        objTable[key.name] = formatISO(item[key.name],{representation:"date"});
                    }
                }

            }

        }
        return objTable;
    });
    return {
        keys: tableObjKeys,
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

interface priceSum  {
    price:number;
    total:number;
}
export function priceSumWithClosedOrders<T extends priceSum>(closedOrders: Array<IClosedOrders>,alias:{key:string,aliasName:string}) {

let orderHash: any = {
        //aliasId:arrayIndex
    };
    return closedOrders.reduce(function (acc: Array<T>, item: IClosedOrders, index: number) {
        let arr: Array<any> = [...acc];
        let aliasId: string = item[alias.aliasName]._id;
        let aliasValue:string = item[alias.aliasName][alias.key];
        if (!orderHash[aliasId] && orderHash[aliasId] !== 0) { //ignore the index is zero  sum is not calculated
            orderHash[aliasId] = arr.length; //hashing it
            arr.push({[alias.aliasName]:aliasValue,price: item.price, total: 1});
            return arr;
        }
        let indexArray = orderHash[aliasId];
        arr[indexArray].price = arr[indexArray].price + item.price;
        arr[indexArray].total += 1; //over how many elements
        return arr;
    }, []);
}