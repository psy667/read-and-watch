import React, { useState } from "react";
import cx from "classnames";
import {
    Card, Typography, Tag, Button,
} from "antd";
import "./styles.scss";

const { Text, Title } = Typography;

export const Record = (props) => {
    const {
        title,
        description,
        type,
        date,
        status,
        tags,
        onStatusChange,
        onDelete,
        onEdit,
    } = props;

    const [showFullInfo, setShowMode] = useState(false);

    const getDateString = (isoTime) => new Date(isoTime).toLocaleDateString("ru-ru");

    return (
        <Card className={cx("record", { "full-info": showFullInfo })} onMouseEnter={() => setShowMode(true)} onMouseLeave={() => setShowMode(false)}>
            <div className="header">
                <div className="tag-wrapper">
                    <Tag color="#108ee9">{type.toUpperCase()}</Tag>
                    <Tag color={status === "complete" ? "green" : "volcano"} onClick={onStatusChange}>{status.toUpperCase()}</Tag>
                </div>
                <div className="button-wrapper">
                    <Button type="normal" shape="circle" icon="edit" size="small" onClick={onEdit} />
                    <Button type="normal" shape="circle" icon="close" size="small" onClick={onDelete} />
                </div>


            </div>
            <Title level={4}>{title}</Title>
            <Text className="description">{description}</Text>
            <div className="tags">
                {
                    tags.map((item) => <Tag key={item}>{item}</Tag>)
                }
            </div>
            <Text className="date" type="secondary">{getDateString(date)}</Text>

        </Card>
    );
};
