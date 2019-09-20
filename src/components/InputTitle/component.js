import React, { useEffect, useState } from "react";

import Input from "antd/es/input";
import Form from "antd/es/form";
import AutoComplete from "antd/es/auto-complete";

import "./styles.scss";

const jsonp = require("jsonp");

const removeRepetition = (array) => Array.from(new Set(array)).slice(0, 5);

export const InputTitle = (props) => {
    const {
        onChange,
        value,
        type,
    } = props;

    const [suggestList, updateList] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [lastSearchTime, setLastSearchTime] = useState(0);
    const [timeoutId, setIdTimeout] = useState(null);
    const language = "ru";

    useEffect(() => setInputValue(value), [value]);

    const searchBooks = (queryRaw) => {
        const query = queryRaw.trim().toLowerCase();

        if (query === "") {
            updateList([]);
            return null;
        }
        jsonp(`https://www.googleapis.com/books/v1/volumes?q=intitle:${encodeURI(query)}&key=${process.env.REACT_APP_BOOK_API_KEY}&printType=books&maxResults=6`,
            null, (err, data) => {
                if (err) {
                    return null;
                }
                const result = (data && data.items && data.items
                    .map((item) => item.volumeInfo.title)) || [];

                updateList(removeRepetition(result));
                return null;
            });
        return null;
    };
    const searchMovies = (queryRaw) => {
        const query = queryRaw.trim().toLowerCase();

        if (query === "") {
            updateList([]);
            return null;
        }
        jsonp(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&query=${encodeURI(query)}&language=${language}`,
            null, (err, data) => {
                if (err) {
                    return null;
                }
                const result = (data && data.results
                    .map((item) => ({
                        title: item.title,
                        id: item.id,
                        rate: item.vote_average,
                        popularity: item.popularity,
                    }))
                    .filter((item) => item.popularity > 1 && item.rate > 3)
                    .map((item) => item.title)) || [];

                updateList(removeRepetition(result));
                return null;
            });
        return null;
    };

    function handleInput(e) {
        const query = e.target ? e.target.value : e;
        setInputValue(query);

        const currentTime = new Date().getTime();
        if (currentTime - 500 < lastSearchTime) {
            clearTimeout(timeoutId);
        }

        setLastSearchTime(currentTime);

        let fnSearch;
        switch (type) {
        case "book":
            fnSearch = searchBooks;
            break;
        case "movie":
            fnSearch = searchMovies;
            break;
        default:
        }
        const id = setTimeout(fnSearch, 500, query);
        setIdTimeout(id);
    }

    function handleBlur() {
        onChange(inputValue);
    }

    return (
        <Form.Item label="Title">
            <AutoComplete
                onSelect={handleInput}
                dataSource={suggestList}
                value={inputValue}
            >
                <Input
                    value={inputValue}
                    onInput={handleInput}
                    onBlur={handleBlur}
                    allowClear
                />
            </AutoComplete>
        </Form.Item>
    );
};
