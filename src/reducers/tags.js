import * as actions from "../actions/actionTypes";

const initialState = {
    list: [],
};


export const tagsReducer = (state = initialState, action) => {
    switch (action.type) {
    case actions.TAGS_LIST_UPDATE: {
        const { tags } = action.payload;
        return {
            ...state,
            list: tags.map((item) => item.id),
        };
    }
    default:
        return state;
    }
};
