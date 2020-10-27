import { Paper, Typography } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import styles from "./style.module.scss";
import withAppBar from "../../utils/withAppBar";
import ComposedInfo from "./ComposedInfo";

const HomePage = () => {
    const userData = useSelector((state: RootState) => state.userData);

    return (
        <Paper className={styles.container} elevation={0} square>
            <Typography variant="h6" style={{ marginBottom: 10 }}>
                Your location
            </Typography>
            <ComposedInfo type="nearby" />
            <Typography variant="h6" style={{ marginTop: 30 }}>
                Favourite stations
            </Typography>
            <div className={styles.favourites}>
                {userData.favouriteStations.length > 0 ? (
                    userData.favouriteStations.map((location, i) => (
                        <ComposedInfo
                            key={`${location.lat},${location.lng}`}
                            type="favourite"
                            location={location}
                            i={i}
                        />
                    ))
                ) : (
                    <Typography>
                        You don't have any favourite stations yet. Add them from
                        Map view.
                    </Typography>
                )}
            </div>
        </Paper>
    );
};

export default withAppBar(HomePage);
