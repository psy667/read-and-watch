import React from "react";

import { Form, Button, Drawer } from "antd";
import "./styles.scss";

export const RecordCreateForm = (props) => {
    const {
        onCreate,
        newRecordData,
        children,
        visible,
        closeForm,
    } = props;

    const handleSubmit = (e) => {
        e.preventDefault();
        onCreate(newRecordData);
    };

    return (
        <Drawer
            title="Add new record"
            placement="bottom"
            height={560}
            visible={visible}
            onClose={closeForm}
        >
            <Form
                onSubmit={handleSubmit}
            >
                {children}
                <Button type="primary" htmlType="submit" block disabled={!newRecordData.title}>Save</Button>
            </Form>
        </Drawer>
    );
};
