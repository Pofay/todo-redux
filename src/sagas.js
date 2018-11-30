import { call, takeEvery } from "redux-saga/effects";
import firestore from "./datastore/firestore";

function* addTodo(action) {
  yield call(
    action =>
      firestore
        .collection("todos")
        .doc(action.id.toString())
        .set({
          text: action.text,
          completed: false
        }),
    action
  );
}

function* toggleTodo(action) {
  yield call(
    action =>
      firestore
        .collection("todos")
        .doc(action.id.toString())
        .update({ completed: action.completed }),
    action
  );
}

export default function* rootSaga() {
  yield takeEvery("ADD-TODO-REQUEST", addTodo);
  yield takeEvery("TOGGLE-TODO-REQUEST", toggleTodo);
}
