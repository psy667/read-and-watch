import { put } from "redux-saga/effects";
import { takeEvery } from "@redux-saga/core/effects";
import {
    loginAction,
    setNewRecordsListAction,
    setNewTagsListAction,
} from "../actions/actions";
import {
    login, recordsSaga, tagsSaga, typesSaga,
} from "../database";

function* initSaga() {
    const userId = yield login();
    yield put(loginAction(userId));

    const recordsList = yield recordsSaga(userId);
    yield put(setNewRecordsListAction(recordsList));


    yield typesSaga(userId);

    const tagsList = yield tagsSaga(userId);
    yield put(setNewTagsListAction(tagsList));
}

function* loginWatcher() {
    yield takeEvery("INIT", initSaga);
}

export function* recordsRootSaga() {
    yield loginWatcher();
}
