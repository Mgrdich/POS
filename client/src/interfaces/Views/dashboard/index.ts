import {DateRanges} from "../../../constants/Enums/General";

export interface IChart {
    url:string;
    query?:string;
    defaultDateValue?:DateRanges;
}