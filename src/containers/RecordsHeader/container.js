import React from "react";
import cx from "classnames";
import { connect, useSelector } from "react-redux";

import "./styles.scss";

import Tooltip from "antd/es/tooltip";
import Avatar from "antd/es/avatar";
import Progress from "antd/es/progress";
import Search from "antd/es/input/Search";

import { filterByStatusAction, filterByTypeAction, searchAction } from "../../actions/actions";
import { auth } from "../../firebase";


const RecordsHeader = (props) => {
    const {
        loading,
        showForm,
        search,
        filterByType,
        selectedType,
    } = props;
    const handleInput = (e) => {
        search(e.target.value);
    };
    const { photoURL, displayName } = auth().currentUser || {};
    const { searchQuery } = useSelector((state) => state.records);

    return (
        <div className={cx("records-header", { "show-form": showForm })}>
            <Progress
                percent={100}
                size="small"
                status={loading ? "active" : "normal"}
                showInfo={false}
            />

            <div className="wrapper">
                <Search placeholder="Search by title or tags" allowClear onChange={handleInput} value={searchQuery} />
                <Tooltip title={displayName} placement="bottomRight">
                    <Avatar src={photoURL} />
                </Tooltip>
            </div>
            <div className="tabs">
                <div
                    className={cx({ active: selectedType === "book" })}
                    onClick={() => filterByType("book")}
                >
                    Books
                </div>
                <div
                    className={cx({ active: selectedType === "movie" })}
                    onClick={() => filterByType("movie")}
                >
                    Movies
                </div>
                <div
                    className={cx({ active: selectedType === "article" })}
                    onClick={() => filterByType("article")}
                >
                    Articles
                </div>
                <div
                    className={cx({ active: selectedType === "video" })}
                    onClick={() => filterByType("video")}
                >
                    Videos
                </div>

            </div>
        </div>
    );
};

const mapStateToProps = (store) => ({
    newRecord: store.records.newRecord,
    tags: store.tags.list,
    showForm: store.records.showForm,
    loading: store.records.loading,
    selectedType: store.records.selectedType,
});

const actions = {
    search: searchAction,
    filterByType: filterByTypeAction,
    filterByStatus: filterByStatusAction,
};

export const RecordsHeaderContainer = connect(mapStateToProps, actions)(RecordsHeader);
