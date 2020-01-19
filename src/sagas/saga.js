import { put } from "redux-saga/effects";
import { takeEvery } from "@redux-saga/core/effects";
import {
    loginAction, openFormAction,
    setNewRecordsListAction,
    setNewTagsListAction, setValueNewRecordAction,
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

    // window.addEventListener('DOMContentLoaded', () => {
    const parsedUrl = new URL(window.location);
    // searchParams.get() will properly handle decoding the values.
    const title = parsedUrl.searchParams.get("title");
    const text = parsedUrl.searchParams.get("text");
    const url = parsedUrl.searchParams.get("url");

    if (title) {
        console.log(title);
        yield put(openFormAction("video"));
        yield put(setValueNewRecordAction("title", title));
        yield put(setValueNewRecordAction("description", `${text} ${url}`));
    }
    // console.log(`Text shared: ${parsedUrl.searchParams.get("text")}`);
    // console.log(`URL shared: ${parsedUrl.searchParams.get("url")}`);
    // yield put()
    // });
}

function* loginWatcher() {
    yield takeEvery("INIT", initSaga);
}


export function* recordsRootSaga() {
    yield loginWatcher();
}
