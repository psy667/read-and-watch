import { auth, db } from "./firebase";

let userId = null;

auth()
    .onAuthStateChanged((user) => {
        if (user) {
            userId = user.uid;
        }
    });

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

export const getRecords = async () => {
    if (!userId) {
        throw Error("no auth");
    }

    return db.collection("users")
        .doc(userId)
        .collection("records")
        .orderBy("date")
        .get()
        .then((response) => {
            const recordsArray = [];

            response.forEach((item) => recordsArray.push({
                ...item.data(),
                id: item.id,
            }));

            return recordsArray;
        });
};

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
