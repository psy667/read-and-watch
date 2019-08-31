import { combineReducers } from "redux";
import {recordsReducer} from "./records";
console.log(recordsReducer);
export default combineReducers({records: recordsReducer});