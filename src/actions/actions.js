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
    RECORD_DELETE,
} from "./actionTypes";

import {
    getRecords, addRecord, deleteRecord, updateRecord, getTags, addTag,
} from "../database";

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

const updateListAction = () => ({
    type: UPDATE_LIST,
    payload: {
        time: new Date().getTime(),
    },
});

export const addRecordAsyncAction = (record) => async (dispatch) => {
    dispatch(createRecordAction());
    dispatch(setLoading(true));
    dispatch(closeFormAction());
    record.tags.map((tag) => addTag({ id: tag, value: tag }));
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
            console.log(e);
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
    const updatedRecord = { ...record, status: record.status === "complete" ? "incomplete" : "complete" };
    updateRecord(updatedRecord)
        .then(() => {
            dispatch(updateListAction());
        });
};
