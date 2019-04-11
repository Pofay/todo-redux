import React, { useEffect } from 'react';
import TodoInput from './TodoInput';
import TodoList from './TodoList';
import TodoFilter from './TodoFilter';
import { connect } from 'react-redux';
import { addTodo, toggleTodo, watchTodos, unwatchTodos } from '../actions';

const mapDispatchToProps = dispatch => ({
  addTodo: (id, content, completed) =>
    dispatch(addTodo(id, content, completed)),
  toggleTodo: (id, completed) => dispatch(toggleTodo(id, completed)),
  watchTodos: () => dispatch(watchTodos()),
  unwatchTodos: () => dispatch(unwatchTodos())
});

const TodoApp = props => {
  const { unwatchTodos, watchTodos } = props;
  useEffect(() => {
    watchTodos();

    return () => unwatchTodos();
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
