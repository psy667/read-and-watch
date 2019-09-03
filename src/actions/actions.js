import {
    RECORDS_LIST_FILTER,
    RECORDS_LIST_SORT,
    RECORDS_LIST_SET_STATUS,
    RECORD_CREATE,
    RECORD_CREATE_SET_VALUE,
    RECORD_EDIT_SET_TITLE,
    RECORD_EDIT_SET_DESCRIPTION,
    RECORD_EDIT_SET_TYPE,
    RECORD_EDIT_SET_TAGS,
    RECORD_EDIT_SET_LINK,
    RECORD_REMOVE,
    TAG_DELETE,
    TAG_RENAME,
    TAG_SET_NAME,
    FORM_CLOSE,
    FORM_OPEN,
    RECORDS_LIST_UPDATE,
    RECORD_EDIT,
    TAGS_LIST_UPDATE,
} from "./actionTypes";

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
