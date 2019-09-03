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
