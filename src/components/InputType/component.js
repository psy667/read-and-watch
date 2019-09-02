import React from "react";
import { Radio, Form } from "antd";
import "./styles.scss";


export const InputType = (props) => {
    const {
        onChange,
        value,
    } = props;
    const handleInput = (e) => onChange(e.target.value);

    return (
        <div className="input-type">
            <Form.Item>
                <Radio.Group onChange={handleInput} defaultValue={value} buttonStyle="solid">
                    <Radio.Button value="book">Book</Radio.Button>
                    <Radio.Button value="article">Article</Radio.Button>
                    <Radio.Button value="movie">Movie</Radio.Button>
                    <Radio.Button value="video">Video</Radio.Button>
                </Radio.Group>
            </Form.Item>
        </div>

    );
};
