import { call, takeEvery, all } from 'redux-saga/effects';
import firestore from './datastore/firestore';

function* addTodo(action) {
  console.log(action);

  yield call(
    action =>
      firestore
        .collection('todos')
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
        .collection('todos')
        .doc(action.id.toString())
        .update({ completed: action.completed }),
    action
  );
}

export default function* rootSaga() {
  yield all([
    takeEvery('ADD-TODO-REQUEST', addTodo),
    takeEvery('TOGGLE-TODO-REQUEST', toggleTodo)
  ]);
}
