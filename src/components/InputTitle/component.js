import React, { useState } from "react";
import { Form, AutoComplete } from "antd";
import "./styles.scss";
import { debounce } from "lodash";

const jsonp = require("jsonp");

const removeRepetition = (array) => Array.from(new Set(array));

export const InputTitle = (props) => {
    const {
        onChange,
        value,
        type,
    } = props;
    const [suggestList, updateList] = useState([]);

    const language = "ru";

    const searchBooks = (query) => {
        jsonp(`https://www.googleapis.com/books/v1/volumes?q=${encodeURI(query)}&key=${process.env.REACT_APP_BOOK_API_KEY}`,
            null, (err, data) => {
                if (err) {
                    return null;
                }
                const result = (data && data.items && data.items
                    .map((item) => item.volumeInfo.title)) || [];

                updateList(removeRepetition(result));
                return null;
            });
    };
    const searchMovies = (query) => {
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
    };
    const handleInput = (query) => {
        onChange(query);

        switch (type) {
        case "book":
            debounce(searchBooks, 1000)(query);
            break;
        case "movie":
            debounce(searchMovies, 1000)(query);
            break;
        default:
        }
    };


    return (
        <Form.Item label="Title">
            <AutoComplete
                onSelect={handleInput}
                onSearch={handleInput}
                dataSource={suggestList}
                value={value}
            />
        </Form.Item>
    );
};
