import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import reducers from "./reducers/combined";
import { recordsRootSaga } from "./sagas/saga";

const sagaMiddleware = createSagaMiddleware();

function* rootSaga() {
    yield recordsRootSaga();
}


export const store = createStore(reducers,
    composeWithDevTools(
        applyMiddleware(
            sagaMiddleware,
            thunk,
        ),
    ));

sagaMiddleware.run(rootSaga);
store.dispatch({ type: "INIT" });
