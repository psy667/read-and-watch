import React, { useState } from "react";
import { Input, Form } from "antd";


import "./styles.scss";


export const InputLink = (props) => {
    const {
        onChange,
        value,
    } = props;

    const [link, enterLink] = useState({
        validateStatus: "success",
        errorMsg: null,
        value,
    });

    const validateLink = (str) => {
        if ((str.indexOf(".") + 1) && (str.split(".").length > 1)) {
            let protocol = "";
            if (!(str.indexOf("http") + 1)) {
                protocol = "https://";
            }
            return {
                value: `${protocol}${str}`,
                validateStatus: "success",
                errorMsg: null,
            };
        }
        return {
            value: str,
            validateStatus: "error",
            errorMsg: "Should be valid link",
        };
    };

    const handleInput = (e) => {
        const inputValue = e.target.value;
        const validateResult = validateLink(inputValue);
        enterLink(validateResult);
        onChange(validateResult.value);
    };

    return (
        <Form.Item label="Link" validateStatus={link.validateStatus} help={link.errorMsg}>
            <Input value={value} onChange={handleInput} />
        </Form.Item>
    );
};
