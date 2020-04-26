import {Response} from "express";
import {DateRanges} from "../constants/enums";

export function noResult(res: Response) {
    res.status(200).json({empty:true});
}

export function dateRangeHandler(dateRanges:DateRanges) {
    switch (dateRanges) {
        case DateRanges.ytd:
          return {

          };
        case DateRanges.last_three_months:
            return {

            };
        case DateRanges.last_month:
            return {

            };
        case DateRanges.yesterday:
            return {

            };
        case DateRanges.today: {
            return {

            };
        }
    }
}