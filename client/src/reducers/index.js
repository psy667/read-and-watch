import { combineReducers } from "redux";
import * as actions from "../actions/actionTypes";

const initialState = {
    records: [
        {
            id: 0,
            title: "Заводной апельсин",
            description: "",
            type: "book",
            date: 1567192310125,
            status: "complete",
            tags: [],
            link: "",
        },
    ],
};

const test = (state = initialState, action) => {
    switch (action.type) {
    default:
        return state;
    }
};

export default combineReducers({
    test,
});
