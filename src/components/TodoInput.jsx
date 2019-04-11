import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import { connect } from 'react-redux';
import uuidv1 from 'uuid/v1';
import { addTodoRequest } from '../actions';

const mapDispatchToProps = dispatch => {
  return {
    issueAddTodo: content => dispatch(addTodoRequest(uuidv1(), content))
  };
};

const TodoInput = props => {
  const { issueAddTodo } = props;

  const [todoText, setTodoText] = useState('');

  return (
    <form
      onSubmit={event => {
        event.preventDefault();
        issueAddTodo(todoText);
        setTodoText('');
      }}
    >
      <InputLabel style={{ display: 'block' }}>
        <b>What needs to be done?</b>
      </InputLabel>
      <Input
        style={{ marginRight: '1%' }}
        placeholder="Enter Todo Name:"
        required
        onChange={event => {
          event.preventDefault();
          const { value } = event.target;
          setTodoText(value);
        }}
        value={todoText}
      />
      <Button type="submit" variant="contained" color="primary">
        Add Todo
      </Button>
    </form>
  );
};

export default connect(
  null,
  mapDispatchToProps
)(TodoInput);
