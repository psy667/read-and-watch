import React from "react";
import cx from "classnames";
import { connect, useDispatch, useSelector } from "react-redux";
import Empty from "antd/es/empty";

import { Record } from "../../components/Record/component";

import {
    deleteRecordAsyncAction,
    editRecordAction, sortByAction,
    toggleRecordStatusAsyncAction,
} from "../../actions/actions";
import "./styles.scss";

import { filter, sort } from "../../selectors/records";
import { Dropdown } from "antd";
import Menu from "antd/es/menu";


const RecordsList = (props) => {
    const {
        editRecord,
        toggleRecordStatus,
        records,
        showForm,
        loading,
    } = props;

    const handleToggleStatus = (record) => {
        toggleRecordStatus(record);
    };

    const dispatch = useDispatch();
    const sortKey = useSelector((state) => state.records.sortKey);

    const handleSortBy = (key) => {
        dispatch(sortByAction(key));
    };

    const menu = (
        <Menu>
            <Menu.Item>
                <button
                    className="link"
                    onClick={() => handleSortBy("title")}
                >
                    Title (alphabetically)
                </button>
            </Menu.Item>
            <Menu.Item>
                <button
                    className="link"
                    onClick={() => handleSortBy("date")}
                >
                    Date (from new to old)
                </button>
            </Menu.Item>
            <Menu.Item>
                <button
                    className="link"
                    onClick={() => handleSortBy("status")}
                >
                    Status (incomplete first)
                </button>
            </Menu.Item>
        </Menu>
    );


    return (
        <div className={cx("record-list", { "show-form": showForm })}>
            <div className="sort">
                <div className="counter">
                    <b>{records.length}</b>
                    {" "}
records

                </div>
                <Dropdown overlay={menu}>
                    <span>
                        Sort by:
                        {" "}
                        <button className="link">
                            {sortKey}
                        </button>
                    </span>
                </Dropdown>
            </div>
            {
                records.map((item) => (
                    <Record
                        key={item.id}
                        title={item.title}
                        description={item.description}
                        type={item.type}
                        date={item.date}
                        tags={item.tags}
                        link={item.link}
                        status={item.status}
                        onStatusChange={() => handleToggleStatus(item)}
                        onEdit={() => editRecord(item)}
                        uploading={item.uploading}
                    />
                ))
            }
            {
                records.length === 0 && !loading
                && <Empty />
            }
        </div>
    );
};

const mapStateToProps = (store) => ({
    records: sort(store, filter(store)),
    showForm: store.records.showForm,
    loading: store.records.loading,
    lastUpdate: store.records.lastUpdate,
});

const actions = {
    editRecord: editRecordAction,
    toggleRecordStatus: toggleRecordStatusAsyncAction,
    deleteRecord: deleteRecordAsyncAction,
};

export const RecordsListContainer = connect(mapStateToProps, actions)(RecordsList);
