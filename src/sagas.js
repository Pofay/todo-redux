import {
  put,
  take,
  call,
  fork,
  takeEvery,
  takeLatest,
  all
} from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import firestore from './datastore/firestore';
import {
  addTodo as addTodoAction,
  toggleTodo as toggleTodoAction
} from './actions';

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

function* watchTodos(action) {
  yield fork(syncTodos);
}

const createTodosChannel = () =>
  eventChannel(emitter => {
    const unsubscribe = firestore.collection('todos').onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change =>
        emitter({
          type: change.type.toUpperCase(),
          id: change.doc.id,
          data: change.doc.data()
        })
      );
    });

    return () => unsubscribe();
  });

function* syncTodos() {
  const todosChannel = createTodosChannel();

  yield takeEvery(todosChannel, function*(action) {
    switch (action.type) {
      case 'ADDED':
        yield put(addTodoAction(action.id, action.data.text, action.completed));
        break;
      case 'MODIFIED':
        yield put(toggleTodoAction(action.id, action.data.completed));
        break;
      default:
        break;
    }
  });

  yield take('UNWATCH-TODOS');
  todosChannel.close();
}

export default function* rootSaga() {
  yield all([
    takeLatest('WATCH-TODOS', watchTodos),
    takeEvery('ADD-TODO-REQUEST', addTodo),
    takeEvery('TOGGLE-TODO-REQUEST', toggleTodo)
  ]);
}
