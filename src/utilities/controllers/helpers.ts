import {Response} from "express";
import {DateRanges} from "../constants/enums";
import {endOfMonth, startOfDay, startOfMonth, startOfYear, subDays, subMonths,addDays,subYears,startOfWeek} from 'date-fns';

export function noResult(res: Response) {
    res.status(200).json({empty:true});
}

export function getDateRange(dateRange:DateRanges) {
    let now = new Date();

    switch (dateRange) {
        case DateRanges.beginning:
            return {
                gt: subYears(now,100),
                lt: addDays(now,1)
            };
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
            let lastMonth:Date = subMonths(startOfMonth(now),1);
            return {
                gt:lastMonth,
                lt:endOfMonth(lastMonth),
            };
        case DateRanges.this_month:
            return {
                gt:startOfMonth(now),
                lt:now,
            };
        case DateRanges.this_week:
            return {
              gt:startOfWeek(now),
              lt:now
            };
        case DateRanges.yesterday:
            return {
                gt:subDays(startOfDay(now),1),
                lt:subDays(now,1)
            };
        case DateRanges.today: {
            return {
                gt: startOfDay(now),
                lt: now,
            };
        }
    }
}