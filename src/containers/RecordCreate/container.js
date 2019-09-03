import React from "react";

import { connect } from "react-redux";
import { Button } from "antd";
import {
    setValueNewRecordAction,
    closeFormAction,
    openFormAction,
    setNewRecordsListAction,
    setNewTagsListAction,
} from "../../actions/actions";
import "./styles.scss";

import { InputType } from "../../components/InputType/component";
import { InputTitle } from "../../components/InputTitle/component";
import { InputDescription } from "../../components/InputDescription/component";
import { InputLink } from "../../components/InputLink/component";
import { InputTags } from "../../components/InputTags/component";
import { RecordCreateForm } from "../../components/RecordCreateForm/component";
import {
    getRecords, addRecord, addTag, getTags,
} from "../../database";


const RecordCreate = (props) => {
    const {
        setValueNewRecord,
        newRecord,
        tags,
        showForm,
        closeForm,
        openForm,
        setNewRecordsList,
        setNewTagsList,
    } = props;

    const updateStore = () => {
        getRecords().then((data) => setNewRecordsList(data));
        getTags().then((data) => setNewTagsList(data));
    };

    const addRecordToDB = (record) => {
        record.tags.map((tag) => addTag({ id: tag, value: tag }));
        addRecord(record).then(() => {
            updateStore();
            closeForm();
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
    setValueNewRecord: setValueNewRecordAction,
    closeForm: closeFormAction,
    openForm: openFormAction,
    setNewRecordsList: setNewRecordsListAction,
    setNewTagsList: setNewTagsListAction,
};

export const RecordCreateContainer = connect(mapStateToProps, actions)(RecordCreate);
