import { fooReducer } from "./foo/reducers";
import { combineReducers } from "redux";

export const rootReducer = combineReducers({ foo: fooReducer });

export type RootState = ReturnType<typeof rootReducer>;
