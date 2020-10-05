import { Paper, Typography } from "@material-ui/core";
import React from "react";
import styles from "./style.module.scss";

const HomePage = () => {
    return (
        <Paper className={styles.container} elevation={0} square>
            <Typography variant="h4">Home</Typography>
        </Paper>
    );
};

export default HomePage;
