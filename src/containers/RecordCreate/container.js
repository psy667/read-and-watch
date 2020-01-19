import React from "react";

import { connect } from "react-redux";

import "./styles.scss";

import { Modal } from "antd";
import Form from "antd/es/form";
import Drawer from "antd/es/drawer";
import TextArea from "antd/es/input/TextArea";
import { InputTags } from "../../components/InputTags/component";
import { InputTitle } from "../../components/InputTitle/component";
import {
    addRecordAsyncAction,
    closeFormAction,
    deleteRecordAsyncAction,
    openFormAction,
    setNewRecordsListAction,
    setNewTagsListAction,
    setValueNewRecordAction,
} from "../../actions/actions";

const { confirm } = Modal;

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
        deleteRecord,
    } = props;

    const addRecordToDB = (record) => {
        addRecord(record);
    };

    const confirmDelete = (id) => {
        confirm({
            title: "Are you sure to delete this item?",
            content: ("This action cannot be undone."),
            cancelText: "No",
            okType: "danger",
            onOk() {
                deleteRecord(id);
            },
        });
    };

    const handleDeleteRecord = (id) => {
        confirmDelete(id);
    };

    const [form] = Form.useForm();

    const handleSubmit = () => {
        addRecordToDB(newRecord);
    };

    return (
        <div className="create-record">
            <div className="button-wrapper">
                <button
                    className="add-new-record"
                    onClick={() => openForm(selectedType)}
                />
            </div>
            <Drawer
                title={formMode === "edit" ? "Edit record" : `Add new ${newRecord.type}`}
                placement="bottom"
                height={300}
                width={500}
                visible={showForm}
                onClose={closeForm}
            >
                <Form
                    onFinish={handleSubmit}
                    form={form}
                >
                    <div className="items">

                        <InputTitle
                            value={newRecord.title}
                            type={newRecord.type}
                            onChangeTitle={(value) => setValueNewRecord("title", value)}
                            onChangeDescription={(value) => setValueNewRecord("description", value)}
                        />

                        <TextArea
                            className="description"
                            placeholder="Add details"
                            autoSize={{ minRows: 3, maxRows: 3 }}
                            value={newRecord.description}
                            onChange={(event) => setValueNewRecord("description", event.target.value)}
                        />

                        <InputTags
                            value={newRecord.tags}
                            onChange={(value) => setValueNewRecord("tags", value)}
                        >
                            {tags}
                        </InputTags>
                    </div>

                    <button
                        className="button-save"
                        type="primary"
                        htmltype="submit"
                        disabled={!newRecord.title}
                    >
                        {"Save "}
                        {newRecord.type}
                    </button>

                    {newRecord.id && (
                        <button
                            className="button-delete"
                            type="primary"
                            // disabled={!newRecord.title}
                            onClick={() => handleDeleteRecord(newRecord.id)}
                        >
Delete
                        </button>
                    )}
                </Form>
            </Drawer>
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
    deleteRecord: deleteRecordAsyncAction,

};

export const RecordCreateContainer = connect(mapStateToProps, actions)(RecordCreate);
