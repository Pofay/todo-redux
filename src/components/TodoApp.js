import React from "react";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";
import TodoFilter from "./TodoFilter";

class TodoApp extends React.Component {
  constructor(props) {
    super(props);
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

  render() {
    return (
      <div style={{ marginLeft: "4%" }}>
        <TodoInput />
        <TodoFilter />
        <TodoList />
      </div>
    );
  }
}

export default TodoApp;
