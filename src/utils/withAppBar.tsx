import {
    AppBar,
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    Toolbar,
    Typography,
    useTheme,
} from "@material-ui/core";
import { Close, HelpOutline } from "@material-ui/icons";
import React, { ComponentClass, FunctionComponent, useState } from "react";
import { useLocation } from "react-router-dom";
import ColorsMeter from "../components/Shared/ColorsMeter";

const pollutionLevels = [
    {
        title: "Good",
        color: "rgb(114, 213, 40)",
        content: "Air quality is good",
    },
    {
        title: "Moderate",
        color: "rgb(240, 223, 15)",
        content:
            "Active children and adults, and people with respiratory disease, such as asthma, should limit prolonged outdoor exertion",
    },
    {
        title: "Unhealthy for Sensitive Groups",
        color: "rgb(240, 124, 47)",
        content:
            "Active children and adults, and people with respiratory disease, such as asthma, should limit prolonged outdoor exertion",
    },
    {
        title: "Unhealthy",
        color: "rgb(239, 42, 54)",
        content:
            "Everyone should avoid prolonged outdoor exertion",
    },
    {
        title: "Very unhealthy",
        color: "rgb(185, 0, 92)",
        content:
            "Active children and adults, and people with respiratory disease, such as asthma, should avoid all outdoor exertion; everyone else, especially children, should limit outdoor exertion",
    },
    {
        title: "Hazardous",
        color: "rgb(132, 0, 132)",
        content: "Everyone should avoid all outdoor exertion",
    },
];

const withAppBar = (WrappedComponent: ComponentClass | FunctionComponent) => {
    return () => {
        const location = useLocation(),
            theme = useTheme(),
            [open, setOpen] = useState(false);

        const handleDialogOpen = () => setOpen(true);
        const handleDialogClose = () => setOpen(false);

        const getTabName = () => {
            switch (location.pathname) {
                case "/":
                    return "Home";
                case "/settings":
                    return "Settings";
                default:
                    return "";
            }
        };

        return (
            <>
                <AppBar
                    position="static"
                    color="default"
                    style={{
                        backgroundColor:
                            theme.palette.type === "dark"
                                ? "rgb(37, 37, 37)"
                                : "rgb(248, 248, 248)",
                    }}
                >
                    <Toolbar>
                        <Typography variant="h6">{getTabName()}</Typography>
                        <div style={{ marginLeft: "auto" }}>
                            <IconButton onClick={handleDialogOpen}>
                                <HelpOutline />
                            </IconButton>
                        </div>
                    </Toolbar>
                </AppBar>
                <WrappedComponent />
                <Dialog open={open} onClose={handleDialogClose}>
                    <DialogTitle>
                        Help
                        <IconButton
                            style={{ position: "absolute", right: 8, top: 8 }}
                            onClick={handleDialogClose}
                        >
                            <Close />
                        </IconButton>
                    </DialogTitle>
                    <DialogContent style={{ marginBottom: 8 }}>
                        <ColorsMeter dataType="AQI" bgColor="none" noData />
                        <Typography>
                            The above scale is divided into 6 groups:
                        </Typography>
                        <br />
                        {pollutionLevels.map((level) => (
                            <Typography key={level.title}>
                                <span style={{ color: level.color }}>
                                    {level.title}
                                </span>{" "}
                                - {level.content}.
                            </Typography>
                        ))}
                    </DialogContent>
                </Dialog>
            </>
        );
    };
};

export default withAppBar;
