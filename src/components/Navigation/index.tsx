import React, { useState, ChangeEvent, useEffect } from "react";
import {
    BottomNavigation,
    BottomNavigationAction,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
} from "@material-ui/core";
import styles from "./style.module.scss";
import { Home, Map, Settings } from "@material-ui/icons";
import { useHistory, useLocation } from "react-router-dom";

const pages = [
    { name: "Home", icon: <Home /> },
    { name: "Map", icon: <Map /> },
    { name: "Settings", icon: <Settings /> },
];

interface NavigationProps {
    drawerMode: boolean;
}

const Navigation = ({ drawerMode }: NavigationProps) => {
    const history = useHistory(),
        [currentPage, setCurrentPage] = useState<string>("Home"),
        location = useLocation();

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
        }
    };

    const handleDrawerClick = (page: string) => {
        if (page !== currentPage) {
            setCurrentPage(page);
            history.push(parseTabName(page));
        }
    };

    const selectIcon = (page: string): JSX.Element => {
        const selectedPage = pages.find(
            (filteredPage) => filteredPage.name === page
        );

        return selectedPage ? selectedPage.icon : <Home />;
    };

    return (
        <>
            {drawerMode ? (
                <Drawer
                    variant="permanent"
                    anchor="left"
                    className={styles.drawer}
                    classes={{
                        paper: styles.drawerPaper,
                    }}
                >
                    <List>
                        {pages.map((page) => (
                            <ListItem
                                button
                                key={page.name}
                                onClick={() => handleDrawerClick(page.name)}
                            >
                                <ListItemIcon>{page.icon}</ListItemIcon>
                                <ListItemText primary={page.name} />
                            </ListItem>
                        ))}
                    </List>
                </Drawer>
            ) : (
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
            )}
        </>
    );
};

export default Navigation;
