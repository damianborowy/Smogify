import React, { useState, ChangeEvent, useEffect } from "react";
import { BottomNavigation, BottomNavigationAction } from "@material-ui/core";
import styles from "./style.module.scss";
import { Home, Map, Settings } from "@material-ui/icons";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearSelectedStation } from "../../store/userData/actions";

const pages = [
    { name: "Home", icon: <Home /> },
    { name: "Map", icon: <Map /> },
    { name: "Settings", icon: <Settings /> },
];

const Navigation = () => {
    const history = useHistory(),
        [currentPage, setCurrentPage] = useState<string>("Home"),
        location = useLocation(),
        dispatch = useDispatch();

    useEffect(() => {
        const path = location.pathname;

        if (path === "/") setCurrentPage("Home");
        else {
            const lowerCasePath = path.slice(1, path.length);
            const page =
                lowerCasePath.charAt(0).toUpperCase() + lowerCasePath.slice(1);
            setCurrentPage(page);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const parseTabName = (page: string) => {
        if (page === "Home") return "/";
        else {
            return `/${page.toLowerCase()}`;
        }
    };

    const handleBottomNavBarChange = (
        event: ChangeEvent<{}>,
        value: string
    ) => {
        if (value !== currentPage) {
            setCurrentPage(value);
            history.push(parseTabName(value));
            dispatch(clearSelectedStation());
        }
    };

    const selectIcon = (page: string): JSX.Element => {
        const selectedPage = pages.find(
            (filteredPage) => filteredPage.name === page
        );

        return selectedPage ? selectedPage.icon : <Home />;
    };

    return (
        <BottomNavigation
            className={styles.bottomNav}
            value={currentPage}
            onChange={handleBottomNavBarChange}
            showLabels
        >
            {pages.map((page) => (
                <BottomNavigationAction
                    label={page.name}
                    value={page.name}
                    key={page.name}
                    icon={selectIcon(page.name)}
                />
            ))}
        </BottomNavigation>
    );
};

export default Navigation;
