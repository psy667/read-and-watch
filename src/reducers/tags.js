import * as actions from "../actions/actionTypes";

const initialState = {
    list: [
        {
            id: 0,
            title: "Художественная литература",
        },
        {
            id: 1,
            title: "20-ый век",
        },
        {
            id: 2,
            title: "Антиутопия",
        },
    ],
    newTag: {
        title: null,
    },

};

const getNewId = () => Math.round(Math.random() * 10 ** 8).toString(16);

export const tagsReducer = (state = initialState, action) => {
    switch (action.type) {
    default:
        return state;
    }
};
