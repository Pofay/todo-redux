import React from "react";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";
import TodoFilter from "./TodoFilter";
import { connect } from "react-redux";

const mapDispatchToProps = dispatch => ({
  addTodo: (id, content, completed) =>
    dispatch({ type: "ADD-TODO", id: id, text: content, completed: completed }),

  toggleTodo: (id, completed) =>
    dispatch({
      type: "TOGGLE-TODO",
      id: id,
      completed: completed
    })
});

class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.db = this.props.db;
  }

  componentDidMount() {
    this.db.collection("todos").onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        switch (change.type) {
          case "added":
            this.props.addTodo(
              change.doc.id,
              change.doc.data().text,
              change.doc.data().completed
            );
            break;
          case "modified":
            this.props.toggleTodo(change.doc.id, change.doc.data().completed);
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

export default connect(
  null,
  mapDispatchToProps
)(TodoApp);
