import MenuBookIcon from "@material-ui/icons/MenuBook";
import InfoIcon from "@material-ui/icons/Info";
import React from "react";


export const nested: any[] = [
    false,
    false,
    [
        { icon: "", location: "/home", translation: "Home" },
        { icon: "", location: "/about", translation: "About" }
    ],
    [
        { icon: "", location: "/home", translation: "Home" },
        { icon: "", location: "/contact", translation: "Contact" }
    ]
];
export const routes : any[] = [
    { icon: <MenuBookIcon />, location: "/menu", translation: "Menu" },
    { icon: <InfoIcon />, location: "/about", translation: "About" },
    {
        icon: "",
        translation: "Other"
    },
    {
        icon: "",
        translation: "Other1"
    }
];
