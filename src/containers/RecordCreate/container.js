import React from "react";

import { connect } from "react-redux";
import { Button } from "antd";
import {
    createRecordAction, setValueNewRecordAction, closeFormAction, openFormAction, setNewRecordsListAction,
} from "../../actions/actions";
import "./styles.scss";

import { InputType } from "../../components/InputType/component";
import { InputTitle } from "../../components/InputTitle/component";
import { InputDescription } from "../../components/InputDescription/component";
import { InputLink } from "../../components/InputLink/component";
import { InputTags } from "../../components/InputTags/component";
import { RecordCreateForm } from "../../components/RecordCreateForm/component";
import { database, getRecords, addRecord } from "../../database";


const RecordCreate = (props) => {
    const {
        setValueNewRecord, createRecord, newRecord, tags, showForm, closeForm, openForm, setNewRecordsList,
    } = props;

    const updateStore = () => {
        getRecords().then((data) => setNewRecordsList(data));
    };

    const addRecordToDB = (record) => {
        addRecord(record).then(() => {
            updateStore();
        });
    };


    return (
        <div className="create-record">
            <div className="button-wrapper">
                <Button
                    type="primary"
                    block
                    icon="plus-circle"
                    size="large"
                    onClick={openForm}
                >
Add new record

                </Button>
            </div>

            <RecordCreateForm
                newRecordData={newRecord}
                onCreate={addRecordToDB}
                visible={showForm}
                closeForm={closeForm}
            >
                <InputType value={newRecord.type} onChange={(value) => setValueNewRecord("type", value)} />
                {
                    ["video", "article"].includes(newRecord.type)
                        ? <InputLink onChange={(value) => setValueNewRecord("link", value)} />
                        : null
                }
                <InputTitle value={newRecord.title} onChange={(value) => setValueNewRecord("title", value)} />
                <InputDescription value={newRecord.description} onChange={(value) => setValueNewRecord("description", value)} />
                <InputTags value={newRecord.tags} onChange={(value) => setValueNewRecord("tags", value)}>
                    {tags}
                </InputTags>
            </RecordCreateForm>
        </div>

    );
};

const mapStateToProps = (store) => ({
    newRecord: store.records.newRecord,
    tags: store.tags.list,
    showForm: store.records.showForm,
});

const actions = {
    createRecord: createRecordAction,
    setValueNewRecord: setValueNewRecordAction,
    closeForm: closeFormAction,
    openForm: openFormAction,
    setNewRecordsList: setNewRecordsListAction,
};

export const RecordCreateContainer = connect(mapStateToProps, actions)(RecordCreate);
