import React from "react";
import { RecordsListContainer } from "../../containers/RecordsList/container";
import { RecordCreateContainer } from "../../containers/RecordCreate/container";
import { RecordsHeaderContainer } from "../../containers/RecordsHeader/container";


function Main() {
    return (
        <>
            <RecordsHeaderContainer />
            <RecordsListContainer />
            <RecordCreateContainer />
        </>
    );
}

export default Main;
