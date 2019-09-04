import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers/combined";
import App from "./App";
import * as serviceWorker from "./serviceWorker";


// Get all the articles in date order:
// console.log(db.getAllFromIndex("articles", "date"));
// }

console.log = (e) => alert(e);

const store = createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root"),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
