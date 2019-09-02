import React from "react";
import { RecordsListContainer } from "../../containers/RecordsList/container";
import { RecordCreateContainer } from "../../containers/RecordCreate/container";

function Main() {
    return (
        <div>
            <RecordsListContainer />
            <RecordCreateContainer />
        </div>
    );
}

export default Main;
