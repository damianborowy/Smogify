import React from "react";
import Location from "../../../models/Location";
import FavouriteInfo from "./FavouriteInfo";
import NearbyInfo from "./NearbyInfo";

interface ComposedInfoProps {
    type: "nearby" | "favourite";
    location?: Location;
    i?: number;
}

const ComposedInfo = ({ type, location, i }: ComposedInfoProps) => {
    return (
        <>
            {type === "nearby" ? (
                <NearbyInfo />
            ) : (
                <FavouriteInfo location={location} i={i} />
            )}
        </>
    );
};

export default ComposedInfo;
