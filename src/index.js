import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import TodoApp from "./components/TodoApp";
import { todos } from "./reducers/todoReducer";
import { visibilityFilter } from "./reducers/visibilityFilter";
import { createStore, applyMiddleware, combineReducers } from "redux";
import * as serviceWorker from "./serviceWorker";
import createSagaMiddleware from "redux-saga";
import firestore from "./datastore/firestore";
import rootSaga from "./sagas";
import dotenv from "dotenv";

dotenv.config();

//const todoReducer = todos; // The name of the reducer is the property
// name inside the state tree in redux.
const sagaMiddleware = createSagaMiddleware();

const todoApp = combineReducers({
  todos,
  visibilityFilter
});

const store = createStore(todoApp, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

const render = () =>
  ReactDOM.render(
    <TodoApp db={firestore} store={store} />,
    document.getElementById("root")
  );

store.subscribe(render);
store.subscribe(() => console.log(store.getState()));
render();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
