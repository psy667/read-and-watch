import React from "react";
import {
    Button, List, PageHeader, Switch,
} from "antd";
import { useHistory } from "react-router";
import { auth } from "../../firebase";
import "./styles.scss";

export function Profile() {
    const history = useHistory();

    const handleGoBack = () => {
        history.push("/");
    };

    const handleLogout = () => {
        auth()
            .signOut()
            .then((r) => {
                history.push("/login");
            });
    };

    const { photoURL, displayName } = auth().currentUser || {};

    if (!displayName) {
        handleGoBack();
    }

    const typesList = [
        {
            title: "Books",
            id: "books",
            value: true,
        },
        {
            title: "Movies",
            id: "movies",
            value: true,
        },
        {
            title: "Articles",
            id: "articles",
            value: true,
        },
        {
            title: "Videos",
            id: "videos",
            value: false,
        },
        {
            title: "Websites",
            id: "websites",
            value: true,
        },
        {
            title: "Series",
            id: "series",
            value: false,
        },

    ];


    return (
        <div className="profile">
            <PageHeader
                onBack={handleGoBack}
                title={displayName}
                subTitle="@psy667"
                avatar={{ src: photoURL }}
                extra={(
                    <div className="button-container">
                        <Button key="2">Settings</Button>
                        <Button key="1" type="danger" onClick={handleLogout}>
                            Logout
                        </Button>
                    </div>
                )}
            />
            <List
                bordered
                dataSource={typesList}
                renderItem={(item) => (
                    <List.Item>
                        <List.Item.Meta
                            title={item.title}
                        />
                        <Switch defaultChecked={item.value} onChange={() => null} />
                    </List.Item>
                )}
            />
            <div className="version">
                v
                {process.env.REACT_APP_VERSION}
            </div>
        </div>
    );
}
