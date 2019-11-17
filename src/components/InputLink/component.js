import React, { useState } from "react";
import Input from "antd/es/input";
import Form from "antd/es/form";

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
        <input
            value={value || ""}
            onChange={handleInput}
            placeholder="Add the link"
        />
    );
};
// {/*<Form.Item name="link" label="Link" validateStatus={link.validateStatus} help={link.errorMsg}>*/}
