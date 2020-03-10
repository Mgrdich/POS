import {Response} from "express";

export function noResult(res: Response) {
    res.status(200).json({empty:true});
}