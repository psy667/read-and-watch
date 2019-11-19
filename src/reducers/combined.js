import { combineReducers } from "redux";
import { recordsReducer } from "./records";
import { tagsReducer } from "./tags";

export default combineReducers({
    records: recordsReducer,
    tags: tagsReducer
});
