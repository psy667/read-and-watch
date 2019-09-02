import React from "react";
import { Input, Form } from "antd";


import "./styles.scss";


export const InputLink = (props) => {
    const {
        onChange,
        value,
    } = props;
    const handleInput = (e) => onChange(e.target.value);

    return (
        <Form.Item label="Link">
            <Input value={value} onChange={handleInput} />
        </Form.Item>
    );
};
