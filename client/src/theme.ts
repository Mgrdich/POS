import {createMuiTheme, Theme} from "@material-ui/core";

export let theme: Theme;
theme = createMuiTheme({
    palette: {
        type: 'dark',
        primary: {
            main: "#66fcf1",

        },
        secondary: {
            main: "#1f2833",
        },
        error: {
            light: "#e57373",
            main: "#f44336",
            dark: "#d32f2f",
            contrastText: "#fff",
        }, warning: {
            light: "#ffb74d",
            main: "#ff9800",
            dark: "#f57c00",
            contrastText: "#66fcf1"
        },
        text: {
            primary: "#c5c6c7",


        },

        background: {
            default: "#0b0c10",
            paper:"#1f2833",

        },
        success: {
            light: "#81c784",
            main: "#4caf50",
            dark: "#388e3c",
            contrastText: "rgba(0, 0, 0, 0.87)"

        },
    },
    overrides: {
        MuiInput: {
            input: {
                color: '#fff'
            },
        },
    }
});

