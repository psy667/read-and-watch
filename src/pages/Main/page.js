import React from "react";
import { RecordsListContainer } from "../../containers/RecordsList/container";
import { RecordCreateContainer } from "../../containers/RecordCreate/container";
import { RecordsHeaderContainer } from "../../containers/RecordsHeader/container";


function Main() {
    return (
        <div>
            <RecordsHeaderContainer />
            <RecordsListContainer />
            <RecordCreateContainer />
        </div>
    );
}

export default Main;
