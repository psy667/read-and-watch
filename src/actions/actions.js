import {
    RECORDS_LIST_FILTER,
    RECORDS_LIST_SORT,
    RECORDS_LIST_SET_STATUS,
    RECORD_CREATE,
    RECORD_CREATE_SET_VALUE,
    FORM_CLOSE,
    FORM_OPEN,
    RECORDS_LIST_UPDATE,
    RECORD_EDIT,
    TAGS_LIST_UPDATE,
    LOADING_SET,
    UPDATE_LIST,
} from "./actionTypes";

import {
    getRecords, addRecord, deleteRecord, updateRecord, getTags, addTag,
} from "../database";

export const toggleStatusAction = (id, currentStatus) => ({
    type: RECORDS_LIST_SET_STATUS,
    payload: {
        id,
        currentStatus,
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

export const closeFormAction = () => ({
    type: FORM_CLOSE,
});

export const openFormAction = () => ({
    type: FORM_OPEN,
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

const updateListAction = () => ({
    type: UPDATE_LIST,
    payload: {
        time: new Date().getTime(),
    },
});

export const addRecordAction = (record) => async (dispatch) => {
    dispatch(setLoading(true));
    dispatch(closeFormAction());

    record.tags.map((tag) => addTag({ id: tag, value: tag }));
    addRecord(record)
        .then(() => {
            dispatch(updateListAction());
        });
};


export const updateStoreAction = (counter = 0) => async (dispatch) => {
    dispatch(setLoading(true));
    getRecords()
        .then((data) => dispatch(setNewRecordsListAction(data)))
        .catch(() => {
            if (counter < 100) {
                setTimeout(() => dispatch(updateStoreAction(counter + 1)), 1000);
            }
        });
    getTags()
        .then((data) => dispatch(setNewTagsListAction(data)))
        .catch(() => {
            if (counter < 100) {
                setTimeout(() => dispatch(updateStoreAction(counter + 1)), 1000);
            }
        });
};

export const deleteRecordAction = (id) => async (dispatch) => {
    deleteRecord(id)
        .then(() => {
            dispatch(updateListAction());
        });
};

export const toggleRecordStatusAction = (record) => async (dispatch) => {
    const updatedRecord = { ...record, status: record.status === "complete" ? "incomplete" : "complete" };
    updateRecord(updatedRecord)
        .then(() => {
            dispatch(updateListAction());
        });
};
