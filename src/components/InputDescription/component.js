import React from "react";
import { Input, Form } from "antd";

import "./styles.scss";

const { TextArea } = Input;


export const InputDescription = (props) => {
    const {
        onChange,
        value,
    } = props;
    const handleInput = (e) => onChange(e.target.value);

    return (
        <Form.Item label="Description">
            <TextArea value={value} onChange={handleInput} autosize />
        </Form.Item>
    );
};
