import * as actions from "../actions/actionTypes";

const initialState = {
    list: [
    ],
    newRecord: {
        title: null,
        description: "",
        type: "book",
        tags: [],
    },
    showForm: false,
    loading: true,
};

export const recordsReducer = (state = initialState, action) => {
    switch (action.type) {
    case actions.RECORDS_LIST_UPDATE: {
        const { records } = action.payload;
        return {
            ...state,
            list: records,
            loading: false,
        };
    }
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
    case actions.RECORD_CREATE_SET_VALUE: {
        const { key, value } = action.payload;
        if (["title", "description", "type", "tags", "link"].includes(key)) {
            return {
                ...state,
                newRecord: { ...state.newRecord, [key]: value },
            };
        }
        return state;
    }
    case actions.RECORD_EDIT: {
        return {
            ...state,
            newRecord: action.payload.record,
            showForm: true,
        };
    }
    case actions.LOADING_SET: {
        return {
            ...state,
            loading: action.payload.value,
        };
    }
    // case actions.RECORD_CREATE: {
    //     const newRecord = {
    //         ...action.payload.record,
    //         id: getNewId(),
    //         date: new Date().getTime(),
    //         status: "incomplete",
    //     };
    //     return {
    //         ...state,
    //         list: [...state.list, action.payload.record],
    //         newRecord: {
    //             title: null,
    //             description: null,
    //             type: null,
    //             tags: [],
    //         },
    //     };
    // }
    case actions.FORM_CLOSE:
        return {
            ...state,
            showForm: false,
            newRecord: {
                title: null,
                description: "",
                type: "book",
                tags: [],
            },
        };
    case actions.UPDATE_LIST: {
        return {
            ...state,
            lastUpdate: action.payload.time,
            loading: true,
        };
    }
    case actions.FORM_OPEN:
        return {
            ...state,
            showForm: true,
        };
    default:
        return state;
    }
};
