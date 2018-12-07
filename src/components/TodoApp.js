import React from "react";
import TodoInput from "./TodoInput";
import InputLabel from "@material-ui/core/InputLabel";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import WorkIcon from "@material-ui/icons/Work";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import uuidv1 from "uuid/v1";

// let nextTodoId = 0;

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

const TodoList = ({ todos, toggleTodo }) => (
  <div style={{ marginRight: "55%" }}>
    <List>
      {todos.map(t => (
        <TodoItem
          key={t.id}
          {...t}
          onClick={event => {
            event.preventDefault();
            toggleTodo(t.id, t.completed);
          }}
        />
      ))}
    </List>
  </div>
);

const TodoFilter = ({ currentFilter, filterValues, changeFilter }) => {
  return (
    <FormControl style={{ width: "20%" }}>
      <InputLabel>Filter Todos</InputLabel>
      <Select value={currentFilter} onChange={changeFilter}>
        {filterValues.map(f => (
          <MenuItem value={f.value}>{f.key}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.toggleTodo = this.toggleTodo.bind(this);
    this.changeVisibilityFilter = this.changeVisibilityFilter.bind(this);
    this.db = this.props.db;
    this.store = this.props.store;
  }

  componentDidMount() {
    this.db.collection("todos").onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        switch (change.type) {
          case "added":
            this.store.dispatch({
              type: "ADD-TODO",
              id: change.doc.id,
              text: change.doc.data().text,
              completed: change.doc.data().completed
            });
            break;
          case "modified":
            this.store.dispatch({
              type: "TOGGLE-TODO",
              id: change.doc.id,
              completed: change.doc.data().completed
            });
            break;
        }
      });
    });
  }

  toggleTodo(todoId, completed) {
    this.store.dispatch({
      type: "TOGGLE-TODO-REQUEST",
      id: todoId,
      completed: !completed
    });
  }

  changeVisibilityFilter(event) {
    event.preventDefault();
    const filter = event.target.value;
    this.store.dispatch({
      type: "SET_VISIBILITY_FILTER",
      filter
    });
  }

  render() {
    const { todos, visibilityFilter } = this.store.getState();
    const filteredTodos = filterTodos(todos, visibilityFilter);
    const filterValues = [
      { key: "All", value: "SHOW_ALL" },
      { key: "Completed", value: "SHOW_COMPLETED" },
      { key: "Active", value: "SHOW_ACTIVE" }
    ];

    return (
      <div style={{ marginLeft: "4%" }}>
        <TodoInput />
        <TodoFilter
          currentFilter={visibilityFilter}
          filterValues={filterValues}
          changeFilter={this.changeVisibilityFilter}
        />
        <TodoList todos={filteredTodos} toggleTodo={this.toggleTodo} />
      </div>
    );
  }
}

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

export default TodoApp;
