import React from "react";
import { Input, Form } from "antd";


import "./styles.scss";


export const InputTitle = (props) => {
    const {
        onChange,
        value,
    } = props;
    const handleInput = (e) => onChange(e.target.value);

    return (
        <Form.Item label="Title">
            <Input value={value} onChange={handleInput} />
        </Form.Item>
    );
};
