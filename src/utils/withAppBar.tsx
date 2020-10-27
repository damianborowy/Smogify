import {
    AppBar,
    IconButton,
    Toolbar,
    Typography,
    useTheme,
} from "@material-ui/core";
import { HelpOutline } from "@material-ui/icons";
import React, { ComponentClass, FunctionComponent } from "react";
import { useLocation } from "react-router-dom";

const withAppBar = (WrappedComponent: ComponentClass | FunctionComponent) => {
    return () => {
        const location = useLocation(),
            theme = useTheme();

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
                            <IconButton>
                                <HelpOutline />
                            </IconButton>
                        </div>
                    </Toolbar>
                </AppBar>
                <WrappedComponent />
            </>
        );
    };
};

export default withAppBar;
