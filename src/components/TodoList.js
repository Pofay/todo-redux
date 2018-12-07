import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import React from "react";
import { connect } from "react-redux";
import WorkIcon from "@material-ui/icons/Work";
import { toggleTodoRequest } from "../actions";

const mapStateToProps = state => ({
  todos: filterTodos(state.todos, state.visibilityFilter)
});

const mapDispatchToProps = dispatch => {
  return {
    issueToggleTodo: (id, completed) =>
      dispatch(toggleTodoRequest(id, completed))
  };
};

const filterTodos = (todos, filter) => {
  switch (filter) {
    case "SHOW_ALL":
      return todos;
    case "SHOW_COMPLETED":
      return todos.filter(t => t.completed);
    case "SHOW_ACTIVE":
      return todos.filter(t => !t.completed);
    default:
      return todos;
  }
};

const TodoItem = ({ text, completed, onClick }) => (
  <ListItem
    style={{ height: "10%", paddingTop: "1%", paddingBottom: "1%" }}
    button
    onClick={onClick}
  >
    <Avatar>
      <WorkIcon />
    </Avatar>
    <ListItemText
      inset
      primary={text}
      style={{ textDecoration: completed ? "line-through" : "none" }}
    />
  </ListItem>
);

const TodoList = ({ todos, issueToggleTodo }) => (
  <div style={{ marginRight: "55%" }}>
    <List>
      {todos.map(t => (
        <TodoItem
          key={t.id}
          {...t}
          onClick={event => {
            event.preventDefault();
            issueToggleTodo(t.id, t.completed);
          }}
        />
      ))}
    </List>
  </div>
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);
