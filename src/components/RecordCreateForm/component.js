import React from "react";

import Form from "antd/es/form";
import Button from "antd/es/button";
import Drawer from "antd/es/drawer";

import "./styles.scss";


export const RecordCreateForm = (props) => {
    const {
        onCreate,
        newRecordData,
        children,
        visible,
        closeForm,
        formMode,
        type,
    } = props;

    const handleSubmit = (e) => {
        e.preventDefault();
        onCreate(newRecordData);
    };

    return (
        <Drawer
            title={formMode === "edit" ? "Edit record" : `Add new ${type}`}
            placement="bottom"
            height={400}
            visible={visible}
            onClose={closeForm}
        >
            <Form
                onSubmit={handleSubmit}
            >
                {children}
                <Button className="button-save" type="primary" htmlType="submit" block disabled={!newRecordData.title}>Save</Button>
            </Form>
        </Drawer>
    );
};
