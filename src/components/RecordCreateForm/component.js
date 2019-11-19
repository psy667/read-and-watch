import React from "react";

import Form from "antd/es/form";
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
    const [form] = Form.useForm();

    const handleSubmit = () => {
        onCreate(newRecordData);
    };

    return (
        <Drawer
            title={formMode === "edit" ? "Edit record" : `Add new ${type}`}
            placement="bottom"
            height={220}
            width={500}
            visible={visible}
            onClose={closeForm}
        >
            <Form
                onFinish={handleSubmit}
                form={form}
            >
                <div className="items">
                    {children}
                </div>

                <button
                    className="button-save"
                    type="primary"
                    htmltype="submit"
                    disabled={!newRecordData.title}
                >
                    {"Save "}
                    {type}
                </button>
            </Form>
        </Drawer>
    );
};
