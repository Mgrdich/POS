import {useEffect, useState} from "react";
import axios, {AxiosResponse} from "axios";

export function useTable (obj:string | Array<any>) {
    

    useEffect(function () {
        if(typeof obj ==='string') { //Url case
            axios.post(obj)
                .then(function (res:AxiosResponse) {
                    console.log(res);
            }).catch(function (err) {
                    console.error(err);
            });
        }
    },[])
} 