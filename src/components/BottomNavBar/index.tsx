import React, { useEffect, useState } from "react";
import styles from "./style.module.scss";

const tabs = ["Home", "Map", "Settings"];

const BottomNavBar = () => {
    const [currentPage, setCurrentPage] = useState<string>("/");

    useEffect(() => {
        const prevUrl = window.location.href.split("/");
        prevUrl.splice(prevUrl.length - 1, 1);

        const newUrl = `${prevUrl.join("/")}${currentPage}`;
        window.location.href = newUrl;
    }, [currentPage]);

    const handlePageChange = (tab: string) => setCurrentPage(parseTabName(tab));

    const parseTabName = (tab: string) => {
        if (tab === "Home") return "/";
        else {
            return `/${tab.toLowerCase()}`;
        }
    };

    return (
        <div>
            {tabs.map((tab) => (
                <div key={tab} onClick={() => handlePageChange(tab)}>
                    {tab}
                </div>
            ))}
        </div>
    );
};

export default BottomNavBar;
