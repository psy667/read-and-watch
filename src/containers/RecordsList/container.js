import React, { useEffect } from "react";

import { connect } from "react-redux";
import { getRecords, deleteRecord, updateRecord } from "../../database";
import { Record } from "../../components/Record/component";
import { toggleStatusAction, setNewRecordsListAction, editRecordAction } from "../../actions/actions";
import "./styles.scss";

const getTagsByIds = (ids, tags) => ids.map((item) => tags.filter((tag) => tag.id === item)[0]);

const RecordsList = (props) => {
    const {
        records, tags, setNewRecordsList, editRecord,
    } = props;

    const updateStore = () => {
        getRecords().then((data) => setNewRecordsList(data));
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
        <div className="record-list">
            {
                records.map((item) => (
                    <Record
                        key={item.id}
                        title={item.title}
                        description={item.description}
                        type={item.type}
                        date={item.date}
                        tags={getTagsByIds(item.tags, tags)}
                        link={item.link}
                        status={item.status}
                        onStatusChange={() => handleToggleStatus(item.id, item)}
                        onDelete={() => handleDeleteRecord(item.id)}
                        onEdit={() => editRecord(item)}
                    />
                ))
            }
        </div>
    );
};

const mapStateToProps = (store) => ({
    records: store.records.list,
    tags: store.tags.list,
});

const actions = {
    toggleStatus: toggleStatusAction,
    setNewRecordsList: setNewRecordsListAction,
    editRecord: editRecordAction,
};

export const RecordsListContainer = connect(mapStateToProps, actions)(RecordsList);
