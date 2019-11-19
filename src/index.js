import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import reducers from "./reducers/combined";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

const store = createStore(reducers, composeWithDevTools(
    applyMiddleware(thunk),
));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root"),
);

serviceWorker.register();
