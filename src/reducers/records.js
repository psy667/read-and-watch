import {
    FORM_CLOSE,
    FORM_OPEN,
    LOADING_SET,
    RECORD_CREATE,
    RECORD_CREATE_SET_VALUE,
    RECORD_DELETE,
    RECORD_EDIT,
    RECORDS_LIST_FILTER_BY_STATUS,
    RECORDS_LIST_FILTER_BY_TYPE,
    RECORDS_LIST_SEARCH,
    RECORDS_LIST_SET_STATUS,
    RECORDS_LIST_UPDATE,
    UPDATE_LIST,
} from "../actions/actionTypes";

const initialState = {
    list: [],
    newRecord: {
        title: "",
        description: "",
        type: "book",
        tags: [],
        link: "",
    },
    showForm: false,
    loading: true,
    formMode: "add",
    searchQuery: "",
    selectedType: "book",
    selectedStatus: null,
};

export const recordsReducer = (state = initialState, action) => {
    switch (action.type) {
    case RECORDS_LIST_UPDATE: {
        const { records } = action.payload;
        return {
            ...state,
            list: records,
            loading: false,
        };
    }
    case RECORDS_LIST_SET_STATUS: {
        const { id, status } = action.payload.record;

        const list = state.list.map((item) => {
            if (item.id === id) {
                return {
                    ...item,
                    status: status === "complete" ? "incomplete" : "complete"
                };
            }
            return item;
        });

        return {
            ...state,
            list,
        };
    }
    case RECORD_CREATE_SET_VALUE: {
        const { key, value } = action.payload;
        if (["title", "description", "type", "tags", "link"].includes(key)) {
            return {
                ...state,
                newRecord: {
                    ...state.newRecord,
                    [key]: value
                },
            };
        }
        return state;
    }
    case RECORD_EDIT: {
        return {
            ...state,
            newRecord: action.payload.record,
            showForm: true,
            formMode: "edit",
        };
    }
    case LOADING_SET: {
        return {
            ...state,
            loading: action.payload.value,
        };
    }
    case RECORD_CREATE: {
        const newRecord = {
            ...state.newRecord,
            id: Math.random()
                .toFixed(8),
            date: new Date().getTime(),
            status: "incomplete",
            uploading: true,
        };
        return {
            ...state,
            list: [...state.list, newRecord],
        };
    }
    case FORM_CLOSE:
        return {
            ...state,
            showForm: false,

        };
    case UPDATE_LIST: {
        return {
            ...state,
            lastUpdate: action.payload.time,
            loading: true,
        };
    }
    case FORM_OPEN:
        return {
            ...state,
            formMode: "add",
            showForm: true,
            newRecord: {
                title: "",
                description: "",
                type: action.payload.type,
                tags: [],
                link: "",
            },
        };
    case RECORD_DELETE: {
        const { id } = action.payload;
        return {
            ...state,
            showForm: false,
            list: state.list.filter((item) => item.id !== id),
        };
    }

    case RECORDS_LIST_SEARCH: {
        return {
            ...state,
            searchQuery: action.payload.query,
        };
    }
    case RECORDS_LIST_FILTER_BY_TYPE: {
        const { type } = action.payload;
        return {
            ...state,
            selectedType: type,
        };
    }
    case RECORDS_LIST_FILTER_BY_STATUS: {
        const { status } = action.payload;
        return {
            ...state,
            selectedStatus: status,
        };
    }
    default:
        return state;
    }
};
