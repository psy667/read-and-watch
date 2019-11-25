import React from "react";
import cx from "classnames";
import Linkify from "react-linkify";
import "./styles.scss";
import Card from "antd/es/card";
import Typography from "antd/es/typography";
import Tag from "antd/es/tag";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { searchAction } from "../../actions/actions";

const { Title } = Typography;


export const UserHeader = () => {
    const { id } = useParams();
    return (
        <div className="user-header">
            Profile:
            {" "}
            {id}
        </div>
    );
};
