import React from "react";

import { connect } from "react-redux";
import { Record } from "../../components/Record/component";
import { toggleStatusAction } from "../../actions/actions";

import "./styles.scss";

const RecordsList = (props) => {
    const { records, toggleStatus } = props;
    return (
        <div>
            {
                records.map((item) => (
                    <Record
                        key={item.id}
                        title={item.title}
                        status={item.status}
                        onStatusChange={() => toggleStatus(item.id, item.status)}
                    />
                ))
            }
        </div>
    );
};

const mapStateToProps = (store) => ({
    records: store.records.list,
});

const actions = {
    toggleStatus: toggleStatusAction,
};

export const RecordsListContainer = connect(mapStateToProps, actions)(RecordsList);
