import {condition} from "../../../interfaces/General";

function conditionParser(value1:string | number ,value2:string | number,condition:condition):boolean {
    switch (condition) {
        case "!==":
            return value1 !== value2;
        case "===":
            return value1 === value2;
        case "<":
            return value1 < value2;
        case "<=":
            return value1 <= value2;
        case ">":
            return value1 > value2;
        case ">=":
            return value1 >= value2;
    }
}