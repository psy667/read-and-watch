import React from "react";

import "./styles.scss";

export const Record = (props) => {
    const {
        title,
        // description,
        // type,
        // date,
        status,
        // tags,
        onStatusChange,
    } = props;
    return (
        <div onClick={onStatusChange}>
            {`${title} - ${status}`}
        </div>
    );
};
