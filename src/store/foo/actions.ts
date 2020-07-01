import { FooObject, UPDATE_FOO1, UPDATE_FOO2, FooActionTypes } from "./types";

export function updateFoo1(newFoo1: boolean): FooActionTypes {
    return {
        type: UPDATE_FOO1,
        payload: newFoo1,
    };
}

export function updateFoo2(newFoo2: FooObject): FooActionTypes {
    return {
        type: UPDATE_FOO2,
        payload: newFoo2,
    };
}
