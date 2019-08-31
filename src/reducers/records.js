import * as actions from "../actions/actionTypes";

const initialState = {
    list: [
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

export const recordsReducer = (state = initialState, action) => {
    switch (action.type) {
    case actions.RECORDS_LIST_SET_STATUS: {
        const { id, currentStatus } = action.payload;

        const list = state.list.map((item) => {
            if (item.id === id) {
                return { ...item, status: currentStatus === "complete" ? "incomplete" : "complete" };
            }
            return item;
        });

        return {
            ...state,
            list,
        };
    }
    default:
        return state;
    }
};
