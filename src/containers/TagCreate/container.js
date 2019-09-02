import React from "react";

import { connect } from "react-redux";

import "./styles.scss";

const Entity = (props) => {

};

const mapStateToProps = (store) => ({
    state: store,
});

export const EntityContainer = connect(mapStateToProps)(Entity);
