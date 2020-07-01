import { FooState, FooActionTypes, UPDATE_FOO1, UPDATE_FOO2 } from "./types";

const initialState: FooState = {
    foo1: true,
    foo2: { x: 0, y: false },
};

export function fooReducer(
    state = initialState,
    action: FooActionTypes
): FooState {
    switch (action.type) {
        case UPDATE_FOO1:
            return {
                ...state,
                foo1: action.payload,
            };
        case UPDATE_FOO2:
            return {
                ...state,
                foo2: action.payload,
            };
        default:
            return state;
    }
}
