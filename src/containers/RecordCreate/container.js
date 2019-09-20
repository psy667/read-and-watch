import React from "react";

import { connect } from "react-redux";

import {
    addRecordAsyncAction,
    closeFormAction,
    openFormAction,
    setNewRecordsListAction,
    setNewTagsListAction,
    setValueNewRecordAction,
} from "../../actions/actions";
import "./styles.scss";

import { InputType } from "../../components/InputType/component";
import { InputTitle } from "../../components/InputTitle/component";
import { InputDescription } from "../../components/InputDescription/component";
import { InputLink } from "../../components/InputLink/component";
import { InputTags } from "../../components/InputTags/component";
import { RecordCreateForm } from "../../components/RecordCreateForm/component";


const RecordCreate = (props) => {
    const {
        setValueNewRecord,
        newRecord,
        tags,
        showForm,
        closeForm,
        openForm,
        addRecord,
        formMode,
        selectedType,
    } = props;

    const addRecordToDB = (record) => {
        addRecord(record);
    };

    return (
        <div className="create-record">
            <div className="button-wrapper">
                <button
                    className="add-new-record"
                    onClick={() => openForm(selectedType)}
                />
            </div>

            <RecordCreateForm
                newRecordData={newRecord}
                onCreate={addRecordToDB}
                visible={showForm}
                closeForm={closeForm}
                formMode={formMode}
                type={newRecord.type}
            >
                { formMode === "edit" && <InputType value={newRecord.type} onChange={(value) => setValueNewRecord("type", value)} /> }
                {
                    ["video", "article"].includes(newRecord.type)
                        ? <InputLink value={newRecord.link} onChange={(value) => setValueNewRecord("link", value)} />
                        : null
                }
                <InputTitle value={newRecord.title} type={newRecord.type} onChange={(value) => setValueNewRecord("title", value)} />
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
    formMode: store.records.formMode,
    selectedType: store.records.selectedType,
});

const actions = {
    setValueNewRecord: setValueNewRecordAction,
    closeForm: closeFormAction,
    openForm: openFormAction,
    setNewRecordsList: setNewRecordsListAction,
    setNewTagsList: setNewTagsListAction,
    addRecord: addRecordAsyncAction,
};

export const RecordCreateContainer = connect(mapStateToProps, actions)(RecordCreate);
