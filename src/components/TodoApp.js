import React from "react";
import TodoInput from "./TodoInput";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TodoList from "./TodoList";
import MenuItem from "@material-ui/core/MenuItem";

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

  changeVisibilityFilter(event) {
    event.preventDefault();
    const filter = event.target.value;
    this.store.dispatch({
      type: "SET_VISIBILITY_FILTER",
      filter
    });
  }

  render() {
    const { visibilityFilter } = this.store.getState();
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
        <TodoList />
      </div>
    );
  }
}

export default TodoApp;
