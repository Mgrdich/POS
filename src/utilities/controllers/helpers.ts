import {Response} from "express";
import {DateRanges} from "../constants/enums";
import {startOfToday,endOfToday,startOfMonth,subMonths,subDays,startOfYear} from 'date-fns';

export function noResult(res: Response) {
    res.status(200).json({empty:true});
}

export function dateRangeHandler(dateRanges:DateRanges) {
    let now = new Date();

    switch (dateRanges) {
        case DateRanges.ytd:
          return {
              gt: startOfYear(now),
              lt: now,
          };
        case DateRanges.last_three_months:
            return {
                gt:subMonths(startOfMonth(now),3),
                lt:now,
            };
        case DateRanges.last_month:
            return {
                gt:subMonths(startOfMonth(now),1),
                lt:now,
            };
        case DateRanges.yesterday:
            return {
                gt:subDays(startOfToday(),1),
                lt:subDays(now,1)
            };
        case DateRanges.today: {
            return {
                gt: startOfToday(),
                lt: now,
            };
        }
    }
}