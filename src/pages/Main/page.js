import React from "react";
import { useHistory } from "react-router";
import { RecordsListContainer } from "../../containers/RecordsList/container";
import { RecordCreateContainer } from "../../containers/RecordCreate/container";
import { RecordsHeaderContainer } from "../../containers/RecordsHeader/container";
import { auth } from "../../firebase";


function Main() {
    const history = useHistory();

    auth()
        .onAuthStateChanged((user) => {
            if (!user) {
                history.push("/login");
            }
        });

    return (
        <>
            <RecordsHeaderContainer />
            <RecordsListContainer />
            <RecordCreateContainer />
        </>
    );
}

export default Main;
