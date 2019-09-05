import React, { useEffect } from "react";
import cx from "classnames";
import { Empty } from "antd";
import { connect } from "react-redux";

import { Record } from "../../components/Record/component";
import {
    toggleStatusAction,
    setNewRecordsListAction,
    editRecordAction,
    setNewTagsListAction,
    updateStoreAction,
    deleteRecordAction,
    toggleRecordStatusAction,
} from "../../actions/actions";
import "./styles.scss";

const RecordsList = (props) => {
    const {
        records,
        editRecord,
        showForm,
        updateStore,
        loading,
        toggleRecordStatus,
        deleteRecord,
        lastUpdate,
    } = props;


    useEffect(() => {
        updateStore();
        return (n) => n;
    }, [lastUpdate, updateStore]);

    const handleDeleteRecord = (id) => {
        deleteRecord(id);
    };

    const handleToggleStatus = (record) => {
        toggleRecordStatus(record);
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
                        onStatusChange={() => handleToggleStatus(item)}
                        onDelete={() => handleDeleteRecord(item.id)}
                        onEdit={() => editRecord(item)}
                    />
                ))
            }
            {
                records.length === 0 && !loading
                && <Empty />
            }
            {
                loading
                && "loading"
            }
        </div>
    );
};

const mapStateToProps = (store) => ({
    records: store.records.list,
    tags: store.tags.list,
    showForm: store.records.showForm,
    loading: store.records.loading,
    lastUpdate: store.records.lastUpdate,
});

const actions = {
    toggleStatus: toggleStatusAction,
    setNewRecordsList: setNewRecordsListAction,
    editRecord: editRecordAction,
    setNewTagsList: setNewTagsListAction,
    updateStore: updateStoreAction,
    toggleRecordStatus: toggleRecordStatusAction,
    deleteRecord: deleteRecordAction,
};

export const RecordsListContainer = connect(mapStateToProps, actions)(RecordsList);
