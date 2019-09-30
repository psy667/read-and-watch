import React from "react";

import "./styles.scss";
import Input from "antd/es/input";
import Form from "antd/es/form";

const { TextArea } = Input;

export const InputDescription = (props) => {
    const {
        onChange,
        value,
    } = props;
    const handleInput = (e) => onChange(e.target.value);

    return (
        <Form.Item className="description" label="Description" name="description">
            <TextArea value={value} onChange={handleInput} autosize />
        </Form.Item>
    );
};
