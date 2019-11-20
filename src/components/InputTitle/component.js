import React, { useEffect, useState } from "react";

import "./styles.scss";
import axios from "axios";


export const InputTitle = (props) => {
    const {
        onChangeTitle,
        onChangeDescription,
        value,
    } = props;

    const [inputValue, setInputValue] = useState("");

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

    function handleInput(e) {
        const query = e.target ? e.target.value : e;

        setInputValue(query);
    }

    const handleBlur = async (e) => {
        const query = e.target ? e.target.value : e;

        const { titleValue, titleType } = validateLink(query);

        console.log(titleValue, titleType);

        if (titleType === "link") {
            const responseRaw = await axios.get("/api/pageTitle", { params: { url: titleValue } });
            const { title } = responseRaw.data;
            onChangeTitle(title);
            onChangeDescription(titleType);
        } else {
            onChangeTitle(titleValue);
        }
    };

    return (
        <input
            className="title"
            value={inputValue}
            placeholder="Add title or link"
            onChange={(e) => handleInput(e)}
            onBlur={(e) => handleBlur(e)}
        />

    );
};
