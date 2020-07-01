export const UPDATE_FOO1 = "UPDATE_FOO1";
export const UPDATE_FOO2 = "UPDATE_FOO2";

export interface FooObject {
    x: number;
    y: boolean;
}

export interface FooState {
    foo1: boolean;
    foo2: FooObject;
}

interface UpdateFoo1 {
    type: typeof UPDATE_FOO1;
    payload: boolean;
}

interface UpdateFoo2 {
    type: typeof UPDATE_FOO2;
    payload: FooObject;
}

export type FooActionTypes = UpdateFoo1 | UpdateFoo2;
