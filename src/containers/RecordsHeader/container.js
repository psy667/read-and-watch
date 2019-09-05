import React from "react";
import cx from "classnames";
import { connect } from "react-redux";
import {
    Progress, Input, Avatar, Tooltip,
} from "antd";
import { auth } from "../../firebase";

import "./styles.scss";

const { Search } = Input;


const RecordsHeader = (props) => {
    const {
        loading,
        showForm,
    } = props;

    const { photoURL, displayName } = auth().currentUser || {};
    return (
        <div className={cx("records-header", { "show-form": showForm })}>
            <div className="wrapper">
                <Search placeholder="Search by title, description or tags" />
                <Tooltip title={displayName} placement="bottomRight">
                    <Avatar src={photoURL} />
                </Tooltip>
            </div>
            <Progress percent={100} size="small" status={loading ? "active" : "normal"} showInfo={false} />
        </div>
    );
};

const mapStateToProps = (store) => ({
    newRecord: store.records.newRecord,
    tags: store.tags.list,
    showForm: store.records.showForm,
    loading: store.records.loading,
});

const actions = {

};

export const RecordsHeaderContainer = connect(mapStateToProps, actions)(RecordsHeader);
