import React from "react";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
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

const TodoList = ({ todos, callback }) => (
  <div style={{ marginRight: "55%" }}>
    <List>
      {todos.map(t => (
        <TodoItem
          key={t.id}
          {...t}
          onClick={() => callback(t.id, t.completed)}
        />
      ))}
    </List>
  </div>
);

class TodoInput extends React.Component {
  constructor(props) {
    super(props);
    this.callback = props.callback;
  }

  render() {
    return (
      <div>
        <InputLabel
          style={{
            display: "block",
            marginTop: "2%",
            marginBottom: "2%"
          }}
        >
          <b>What needs to be done?</b>
        </InputLabel>
        <Input
          inputRef={node => {
            this.Input = node;
          }}
          style={{ marginRight: "1%" }}
          placeholder="Enter Todo Name:"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            this.callback(this.Input.value, uuidv1());
            this.Input.value = "";
          }}
        >
          Add Todo
        </Button>
      </div>
    );
  }
}

class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.store = this.props.store;
    this.db = this.props.db;
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

  handleSubmit(textInput, id) {
    this.store.dispatch({
      type: "ADD-TODO-REQUEST",
      id: id,
      text: textInput
    });
  }

  handleOnClick(todoId, completed) {
    this.store.dispatch({
      type: "TOGGLE-TODO-REQUEST",
      id: todoId,
      completed: !completed
    });
  }

  handleChange(event) {
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

    return (
      <div style={{ marginLeft: "4%" }}>
        <TodoInput callback={this.handleSubmit} />
        <FormControl style={{ width: "20%" }}>
          <InputLabel>Filter Todos</InputLabel>
          <Select value={visibilityFilter} onChange={this.handleChange}>
            <MenuItem value={"SHOW_ALL"}>All</MenuItem>
            <MenuItem value={"SHOW_COMPLETED"}>Completed</MenuItem>
            <MenuItem value={"SHOW_ACTIVE"}>Active</MenuItem>
          </Select>
        </FormControl>
        <TodoList todos={filteredTodos} callback={this.handleOnClick} />
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
