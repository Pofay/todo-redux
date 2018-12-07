import React from "react";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import { connect } from "react-redux";
import uuidv1 from "uuid/v1";
import { addTodoRequest } from "../actions";

const mapDispatchToProps = dispatch => {
  return {
    issueAddTodo: content => dispatch(addTodoRequest(uuidv1(), content))
  };
};

class TodoInput extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <form
        onSubmit={event => {
          event.preventDefault();
          this.props.issueAddTodo(this.Input.value);
          this.Input.value = "";
        }}
      >
        <InputLabel style={{ display: "block" }}>
          <b>What needs to be done?</b>
        </InputLabel>
        <Input
          inputRef={node => {
            this.Input = node;
          }}
          style={{ marginRight: "1%" }}
          placeholder="Enter Todo Name:"
          required
        />
        <Button type="submit" variant="contained" color="primary">
          Add Todo
        </Button>
      </form>
    );
  }
}

export default connect(
  null,
  mapDispatchToProps
)(TodoInput);
