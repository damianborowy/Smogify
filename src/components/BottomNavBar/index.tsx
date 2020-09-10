import React, { useState, ChangeEvent } from "react";
import styles from "./style.module.scss";
import { BottomNavigation, BottomNavigationAction } from "@material-ui/core";
import { Home, Map, Settings } from "@material-ui/icons";
import { useHistory } from "react-router-dom";

const pages = ["Home", "Map", "Settings"];

const BottomNavBar = () => {
    const history = useHistory(),
        [currentPage, setCurrentPage] = useState<string>("Home");

    const parseTabName = (page: string) => {
        if (page === "Home") return "/";
        else {
            return `/${page.toLowerCase()}`;
        }
    };

    const handleChange = (event: ChangeEvent<{}>, value: string) => {
        if (value !== currentPage) {
            setCurrentPage(value);
            history.push(parseTabName(value));
        }
    };

    const selectIcon = (page: string): JSX.Element => {
        switch (page) {
            case "Home":
                return <Home />;
            case "Map":
                return <Map />;
            case "Settings":
                return <Settings />;
            default:
                return <></>;
        }
    };

    return (
        <BottomNavigation
            className={styles.navbar}
            value={currentPage}
            onChange={handleChange}
            showLabels
        >
            {pages.map((page) => (
                <BottomNavigationAction
                    label={page}
                    value={page}
                    key={page}
                    icon={selectIcon(page)}
                />
            ))}
        </BottomNavigation>
    );
};

export default BottomNavBar;
