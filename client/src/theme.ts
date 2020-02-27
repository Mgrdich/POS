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
            contrastText: "rgba(0, 0, 0, 0.87)"
        },
        text: {
            primary: "#c5c6c7",

        },
        background: {
            default: "#0b0c10",

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

