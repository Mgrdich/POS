import {TableStatus} from "./enums";
import {tableStatusType} from "../../interfaces/constants";

export const TABLE_STATUS:Array<tableStatusType> = [TableStatus.open,TableStatus.closed,TableStatus.reserved,TableStatus.suspended];