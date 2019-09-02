import { openDB } from "idb";


export async function database() {
    const DB = openDB("read-and-watch", 1, {
        upgrade(db) {
            const store = db.createObjectStore("records", {
                keyPath: "id",
                autoIncrement: true,
            });
            store.createIndex("date", "date");
        },
    });
    return DB;
}

export const deleteRecord = async (key) => database().then((db) => db.delete("records", key));

export const updateRecord = async (value) => database().then((db) => db.put("records", value));

export const addRecord = async (record) => {
    if (record.id) {
        return database().then((db) => db.put("records", record));
    }
    const newRecordObject = {
        ...record,
        date: new Date().getTime(),
        status: "incomplete",
    };
    return database().then((db) => {
        db.add("records", newRecordObject);
    });
};


export const getRecords = async () => database().then((db) => db.getAll("records"));
