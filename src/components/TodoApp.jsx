import React, { useEffect } from 'react';
import TodoInput from './TodoInput';
import TodoList from './TodoList';
import TodoFilter from './TodoFilter';
import { connect } from 'react-redux';
import { addTodo, toggleTodo } from '../actions';

const mapDispatchToProps = dispatch => ({
  addTodo: (id, content, completed) =>
    dispatch(addTodo(id, content, completed)),
  toggleTodo: (id, completed) => dispatch(toggleTodo(id, completed))
});

const TodoApp = ({ db }) => {
  useEffect(() => {
    const unsubscribe = db.collection('todos').onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        switch (change.type) {
          case 'added':
            this.props.addTodo(
              change.doc.id,
              change.doc.data().text,
              change.doc.data().completed
            );
            break;
          case 'modified':
            this.props.toggleTodo(change.doc.id, change.doc.data().completed);
            break;
          default:
            break;
        }
      });
    });

    return () => unsubscribe();
  });

  return (
    <div style={{ marginLeft: '4%' }}>
      <TodoInput />
      <TodoFilter />
      <TodoList />
    </div>
  );
};

export default connect(
  null,
  mapDispatchToProps
)(TodoApp);
