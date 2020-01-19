import React, { useEffect, useState } from "react";

import "./styles.scss";
import axios from "axios";
import Search from "antd/es/input/Search";


export const InputTitle = (props) => {
    const {
        onChangeTitle,
        onChangeDescription,
        value,
    } = props;

    const [inputValue, setInputValue] = useState("");
    const [loading, setLoader] = useState(false);

    useEffect(() => setInputValue(value), [value]);

    const validateLink = (str) => {
        if ((str.indexOf(".") + 1) && (str.split(".").length > 1)) {
            let protocol = "";
            if (!(str.indexOf("http") + 1)) {
                protocol = "https://";
            }
            return {
                titleValue: `${protocol}${str}`,
                titleType: "link",
            };
        }
        return {
            titleValue: str,
            titleType: "title",
        };
    };

    const handleInput = async (e) => {
        const query = e.target ? e.target.value : e;
        setInputValue(query);

        const { titleValue, titleType } = validateLink(query);

        if (titleType === "link") {
            setLoader(true);
            try {
                const responseRaw = await axios.get("/api/pageTitle", { params: { url: titleValue } });
                const { title } = responseRaw.data;
                onChangeTitle(title);
                onChangeDescription(titleValue);
            } catch (e) {
                console.log(e);
            } finally {
                setLoader(false);
            }
        } else {
            onChangeTitle(titleValue);
        }
    };

    return (
        <Search
            loading={loading}
            className="title"
            value={inputValue}
            size="large"
            placeholder="Add title or link"
            onChange={(e) => handleInput(e)}
            onBlur={(e) => handleInput(e)}
        />

    );
};
