import React from "react";
import { connect } from "react-redux";

function ProfileContainer() {
    return (
        <div>
            <div>Profile</div>
        </div>
    );
}

const mapStateToProps = (state) => state;

const actionCreators = {

};

export const Profile = connect(mapStateToProps, actionCreators)(ProfileContainer);
