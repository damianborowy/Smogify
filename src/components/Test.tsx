import React from "react";
import { Button } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/";
import { updateFoo1 } from "../store/foo/actions";

const Test = () => {
    const test = useSelector((state: RootState) => state.foo),
        dispatch = useDispatch();

    return (
        <Button onClick={() => dispatch(updateFoo1(!test.foo1))}>
            {test.foo1 ? "True" : "False"}
        </Button>
    );
};

export default Test;
