import React, { useEffect } from "react";
import cx from "classnames";
import { Empty } from "antd";
import { connect } from "react-redux";
import {
    getRecords, deleteRecord, updateRecord, getTags,
} from "../../database";
import { Record } from "../../components/Record/component";
import {
    toggleStatusAction, setNewRecordsListAction, editRecordAction, setNewTagsListAction,
} from "../../actions/actions";
import "./styles.scss";

const RecordsList = (props) => {
    const {
        records, setNewRecordsList, editRecord, setNewTagsList, showForm,
    } = props;


    // const updateStore = () => {
    //     getRecords().then((response) => {
    //         const recordsArray = [];
    //
    //         response.forEach((item) => recordsArray.push({ ...item.data(), id: item.id }));
    //
    //         setNewRecordsList(recordsArray);
    //     });
    //
    //     getTags().then((response) => {
    //         const tagsArray = [];
    //
    //         response.forEach((item) => tagsArray.push(item.data().title));
    //
    //         setNewTagsList(tagsArray);
    //     });
    // };

    const updateStore = () => {
        getRecords().then((data) => setNewRecordsList(data));
        getTags().then((data) => setNewTagsList(data));
    };

    useEffect(updateStore, []);

    const handleDeleteRecord = (id) => {
        deleteRecord(id).then(updateStore);
    };

    const handleToggleStatus = (id, record) => {
        const updatedRecord = { ...record, status: record.status === "complete" ? "incomplete" : "complete" };
        updateRecord(updatedRecord).then(updateStore);
    };

    return (
        <div className={cx("record-list", { "show-form": showForm })}>
            {
                records.map((item) => (
                    <Record
                        key={item.id}
                        title={item.title}
                        description={item.description}
                        type={item.type}
                        date={item.date}
                        tags={item.tags}
                        link={item.link}
                        status={item.status}
                        onStatusChange={() => handleToggleStatus(item.id, item)}
                        onDelete={() => handleDeleteRecord(item.id)}
                        onEdit={() => editRecord(item)}
                    />
                ))
            }
            {
                records.length === 0
                && <Empty />
            }
        </div>
    );
};

const mapStateToProps = (store) => ({
    records: store.records.list,
    tags: store.tags.list,
    showForm: store.records.showForm,
});

const actions = {
    toggleStatus: toggleStatusAction,
    setNewRecordsList: setNewRecordsListAction,
    editRecord: editRecordAction,
    setNewTagsList: setNewTagsListAction,
};

export const RecordsListContainer = connect(mapStateToProps, actions)(RecordsList);
