import React from "react";
import { Select, Form } from "antd";

import "./styles.scss";

const { Option } = Select;


export const InputTags = (props) => {
    const {
        onChange,
        children,
        value,
    } = props;
    const handleInput = (e) => onChange(e);

    return (
        <Form.Item label="Tags">
            <Select
                mode="tags"
                style={{ width: "100%" }}
                placeholder="Please select"
                onChange={handleInput}
                value={value}
            >
                {
                    children.map((item) => (
                        <Option key={item} value={item}>
                            {item}
                        </Option>
                    ))
                }
            </Select>
        </Form.Item>
    );
};
