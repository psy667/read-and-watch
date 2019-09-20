import React, { useState } from "react";
import cx from "classnames";

import "./styles.scss";
import Card from "antd/es/card";
import Typography from "antd/es/typography";
import Tag from "antd/es/tag";
import Button from "antd/es/button";

const { Text, Title } = Typography;

export const Record = (props) => {
    const {
        title,
        description,
        date,
        status,
        tags,
        onStatusChange,
        onDelete,
        onEdit,
        uploading,
        link,
    } = props;

    const [showFullInfo, setShowMode] = useState(false);

    const getDateString = (isoTime) => new Date(isoTime).toLocaleDateString("ru-ru");
    const handleStatusChange = () => {
        window.navigator.vibrate([20, 20, 20]);
        onStatusChange();
    };
    return (
        <Card
            className={cx("record", { "full-info": showFullInfo, uploading })}
            onMouseEnter={() => setShowMode(true)}
            onMouseLeave={() => setShowMode(false)}
        >

            <div className="header">
                <div className="tag-wrapper">
                    <Text className="date" type="secondary">{getDateString(date)}</Text>

                </div>
                <div className="button-wrapper">
                    <Button type="normal" shape="circle" icon="edit" size="small" onClick={showFullInfo ? onEdit : () => null} />
                    <Button type="normal" shape="circle" icon="close" size="small" onClick={showFullInfo ? onDelete : () => null} />
                </div>


            </div>
            <div className="title">
                <div className={cx("indicator", status === "complete" ? "complete" : "incomplete")} onClick={handleStatusChange} />
                <Title level={4}>
                    {
                        link
                            ? <a href={link} target="_blank" rel="noopener noreferrer">{title}</a>
                            : <>{ title }</>
                    }
                </Title>
            </div>
            <Text className="description">{description}</Text>
            <div className="tags">
                {
                    tags.map((item) => <Tag key={item}>{item}</Tag>)
                }
            </div>

        </Card>
    );
};
