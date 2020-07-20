import React, { useEffect, useState, ChangeEvent } from "react";
import styles from "./style.module.scss";
import { BottomNavigation, BottomNavigationAction } from "@material-ui/core";
import { Home, Map, Settings } from "@material-ui/icons";

const pages = ["Home", "Map", "Settings"];

const BottomNavBar = () => {
    const [currentPage, setCurrentPage] = useState<string>("Home");

    useEffect(() => {
        const prevUrl = window.location.href.split("/");
        prevUrl.splice(prevUrl.length - 1, 1);

        const newUrl = `${prevUrl.join("/")}${parseTabName(currentPage)}`;
        window.location.href = newUrl;
    }, [currentPage]);

    const parseTabName = (page: string) => {
        if (page === "Home") return "/";
        else {
            return `/${page.toLowerCase()}`;
        }
    };

    const handleChange = (event: ChangeEvent<{}>, value: string) =>
        setCurrentPage(value);

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
