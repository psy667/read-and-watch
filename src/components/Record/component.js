import React from "react";
import cx from "classnames";
import Linkify from "react-linkify";
import "./styles.scss";
import Card from "antd/es/card";
import Typography from "antd/es/typography";
import Tag from "antd/es/tag";

const { Title } = Typography;


export const Record = (props) => {
    const {
        title,
        description,
        status,
        tags,
        onStatusChange,
        onEdit,
        uploading,
    } = props;

    const componentDecorator = (href, text, key) => (
        <a href={href} key={key} target="_blank" rel="noopener noreferrer">
            {text}
        </a>
    );

    const handleStatusChange = () => {
        window.navigator.vibrate([20, 20, 20]);
        onStatusChange();
    };
    return (
        <Card
            className={cx("record", { uploading })}
        >

            <div className="header">
                <div className="tag-wrapper"/>
                <div className="button-wrapper"/>


            </div>
            <div className="title">
                <div className={cx("indicator", status === "complete" ? "complete" : "incomplete")}
                     onClick={handleStatusChange}/>
                <Title level={4} onClick={onEdit}>
                    {title}
                </Title>
            </div>
            <Linkify
                className="description"
                componentDecorator={componentDecorator}
            >
                {description}
            </Linkify>
            <div className="tags">
                {
                    tags.map((item) => <Tag key={item}>{item}</Tag>)
                }
            </div>

        </Card>
    );
};
