import { db } from "./firebase";

const userId = localStorage.getItem("id") || "user";

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
        return db.collection("users").doc(userId).collection("records").doc(record.id)
            .set(record);
    }
    const newRecordObject = {
        ...record,
        date: new Date().getTime(),
        status: "incomplete",
    };
    return db.collection("users").doc(userId).collection("records").add(newRecordObject);
};

export const addTag = async (tag) => db.collection("users").doc(userId).collection("tags").add(tag);

export const getRecords = async () => db.collection("users")
    .doc(userId)
    .collection("records")
    .get()
    .then((response) => {
        const recordsArray = [];

        response.forEach((item) => recordsArray.push({ ...item.data(), id: item.id }));

        return recordsArray;
    });

export const getTags = async () => db
    .collection("users")
    .doc(userId)
    .collection("tags")
    .get()
    .then((response) => {
        const tagsArray = [];

        response.forEach((item) => tagsArray.push({ ...item.data(), id: item.id }));

        return tagsArray;
    });
