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
    formMode: "add",
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
        const { id, status } = action.payload.record;

        const list = state.list.map((item) => {
            if (item.id === id) {
                return { ...item, status: status === "complete" ? "incomplete" : "complete" };
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
            formMode: "edit",
        };
    }
    case actions.LOADING_SET: {
        return {
            ...state,
            loading: action.payload.value,
        };
    }
    case actions.RECORD_CREATE: {
        const newRecord = {
            ...state.newRecord,
            id: Math.random().toFixed(8),
            date: new Date().getTime(),
            status: "incomplete",
            uploading: true,
        };
        return {
            ...state,
            list: [...state.list, newRecord],
        };
    }
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
            formMode: "add",
            showForm: true,
            newRecord: { ...state.newRecord, type: action.payload.type },
        };
    case actions.RECORD_DELETE: {
        const { id } = action.payload;
        return {
            ...state,
            list: state.list.filter((item) => item.id !== id),
        };
    }
    default:
        return state;
    }
};
