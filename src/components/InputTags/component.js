import React from "react";
import Select from "antd/es/select";

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
        <Select
            mode="tags"
            style={{ width: "100%" }}
            placeholder="Add some tags"
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
    );
};
