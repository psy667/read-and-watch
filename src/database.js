import { auth, db } from "./firebase";
import { setNewRecordsListAction, setNewTagsListAction } from "./actions/actions";
import { store } from "./store";

let userId = null;

export function login() {
    return new Promise((resolve) => auth()
        .onAuthStateChanged((user) => {
            if (user) {
                userId = user.uid;
                resolve(userId);
            }
        }));
}

export function recordsSaga(userID) {
    return new Promise((resolve) => db.collection("users")
        .doc(userID)
        .collection("records")
        .onSnapshot((response) => {
            const result = [];

            response.forEach((item) => result.push({
                ...item.data(),
                id: item.id,
            }));

            resolve(result);
            store.dispatch(setNewRecordsListAction(result));
        }));
}

export function tagsSaga(userID) {
    return new Promise((resolve) => db.collection("users")
        .doc(userID)
        .collection("tags")
        .onSnapshot((response) => {
            const result = [];

            response.forEach((item) => result.push({
                ...item.data(),
                id: item.id,
            }));

            resolve(result);
            store.dispatch(setNewTagsListAction(result));
        }));
}

export const deleteRecord = async (id) => db.collection("users")
    .doc(userId)
    .collection("records")
    .doc(id)
    .delete();

export const updateRecord = async (value) => db.collection("users")
    .doc(userId)
    .collection("records")
    .doc(value.id)
    .set(value);

export const addRecord = async (record) => {
    if (record.id) {
        return db.collection("users")
            .doc(userId)
            .collection("records")
            .doc(record.id)
            .set(record);
    }
    const newRecordObject = {
        ...record,
        date: new Date().getTime(),
        status: "incomplete",
    };
    return db.collection("users")
        .doc(userId)
        .collection("records")
        .add(newRecordObject);
};

export const addTag = async (tag) => db.collection("users")
    .doc(userId)
    .collection("tags")
    .doc(tag.id)
    .set(tag);

// export const getRecords = async () => {
//     if (!userId) {
//         throw Error("no auth");
//     }
//
//     return db.collection("users")
//         .doc(userId)
//         .collection("records")
//         .orderBy("date")
//         .get()
//         .then((response) => {
//             const recordsArray = [];
//
//             response.forEach((item) => recordsArray.push({
//                 ...item.data(),
//                 id: item.id,
//             }));
//
//             return recordsArray;
//         });
// };

export const getTags = async () => {
    if (!userId) {
        throw Error("no auth");
    }

    return db
        .collection("users")
        .doc(userId)
        .collection("tags")
        .get()
        .then((response) => {
            const tagsArray = [];

            response.forEach((item) => tagsArray.push({
                ...item.data(),
                id: item.id,
            }));

            return tagsArray;
        });
};
