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
    TAGS_LIST_UPDATE,
    UPDATE_LIST,
} from "./actionTypes";

import { addRecord, addTag, deleteRecord, getRecords, getTags, updateRecord, } from "../database";

export const toggleStatusAction = (record) => ({
    type: RECORDS_LIST_SET_STATUS,
    payload: {
        record,
    },
});

export const setValueNewRecordAction = (key, value) => ({
    type: RECORD_CREATE_SET_VALUE,
    payload: {
        key,
        value,
    },
});

export const createRecordAction = (record) => ({
    type: RECORD_CREATE,
    payload: {
        record,
    },
});

export const deleteRecordAction = (id) => ({
    type: RECORD_DELETE,
    payload: {
        id,
    },
});

export const closeFormAction = () => ({
    type: FORM_CLOSE,
});

export const openFormAction = (type) => ({
    type: FORM_OPEN,
    payload: { type },
});

export const setNewRecordsListAction = (records) => ({
    type: RECORDS_LIST_UPDATE,
    payload: {
        records,
    },
});

export const editRecordAction = (record) => ({
    type: RECORD_EDIT,
    payload: {
        record,
    },
});

export const setNewTagsListAction = (tags) => ({
    type: TAGS_LIST_UPDATE,
    payload: {
        tags,
    },
});

export const setLoading = (value) => ({
    type: LOADING_SET,
    payload: {
        value,
    },
});

export const searchAction = (query) => ({
    type: RECORDS_LIST_SEARCH,
    payload: {
        query,
    },
});

const updateListAction = () => ({
    type: UPDATE_LIST,
    payload: {
        time: new Date().getTime(),
    },
});

export const filterByTypeAction = (type) => ({
    type: RECORDS_LIST_FILTER_BY_TYPE,
    payload: {
        type,
    },
});

export const filterByStatusAction = (status) => ({
    type: RECORDS_LIST_FILTER_BY_STATUS,
    payload: {
        status,
    },
});

export const addRecordAsyncAction = (record) => async (dispatch) => {
    dispatch(createRecordAction());
    dispatch(setLoading(true));
    dispatch(closeFormAction());
    record.tags.map((tag) => addTag({
        id: tag,
        value: tag
    }));
    addRecord(record)
        .then(() => {
            dispatch(updateListAction());
        });
};


export const updateStoreAsyncAction = (counter = 0) => async (dispatch) => {
    dispatch(setLoading(true));
    getRecords()
        .then((data) => dispatch(setNewRecordsListAction(data)))
        .catch((e) => {
            // eslint-disable-next-line no-console
            console.log(e.message);
            if (counter < 10) {
                setTimeout(() => dispatch(updateStoreAsyncAction(counter + 1)), 1000);
            }
        });
    getTags()
        .then((data) => dispatch(setNewTagsListAction(data)))
        .catch(() => {
            if (counter < 10) {
                setTimeout(() => dispatch(updateStoreAsyncAction(counter + 1)), 1000);
            }
        });
};

export const deleteRecordAsyncAction = (id) => async (dispatch) => {
    dispatch(deleteRecordAction(id));
    deleteRecord(id)
        .then(() => {
            dispatch(updateListAction());
        });
};

export const toggleRecordStatusAsyncAction = (record) => async (dispatch) => {
    dispatch(toggleStatusAction(record));
    const updatedRecord = {
        ...record,
        status: record.status === "complete" ? "incomplete" : "complete"
    };
    updateRecord(updatedRecord)
        .then(() => {
            dispatch(updateListAction());
        });
};
