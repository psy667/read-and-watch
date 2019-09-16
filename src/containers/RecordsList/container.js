import React, { useEffect } from "react";
import cx from "classnames";
import { Empty } from "antd";
import { connect } from "react-redux";

import { Record } from "../../components/Record/component";
import {
    editRecordAction,
    updateStoreAsyncAction,
    deleteRecordAsyncAction,
    toggleRecordStatusAsyncAction,
} from "../../actions/actions";
import "./styles.scss";
import { filter } from "../../selectors/records";

const RecordsList = (props) => {
    const {
        editRecord,
        updateStore,
        toggleRecordStatus,
        deleteRecord,
        records,
        showForm,
        loading,
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
                        uploading={item.uploading}
                    />
                ))
            }
            {
                records.length === 0 && !loading
                && <Empty />
            }
        </div>
    );
};

const mapStateToProps = (store) => ({
    records: filter(store),
    showForm: store.records.showForm,
    loading: store.records.loading,
    lastUpdate: store.records.lastUpdate,
});

const actions = {
    editRecord: editRecordAction,
    updateStore: updateStoreAsyncAction,
    toggleRecordStatus: toggleRecordStatusAsyncAction,
    deleteRecord: deleteRecordAsyncAction,
};

export const RecordsListContainer = connect(mapStateToProps, actions)(RecordsList);
