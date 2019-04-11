import React, { useEffect } from 'react';
import TodoInput from './TodoInput';
import TodoList from './TodoList';
import TodoFilter from './TodoFilter';
import { connect } from 'react-redux';
import { watchTodos, unwatchTodos } from '../actions';

const mapDispatchToProps = dispatch => ({
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
