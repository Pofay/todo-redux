import React from "react";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";

class TodoInput extends React.Component {
  constructor(props) {
    super(props);
    this.addTodo = props.addTodo;
  }

  render() {
    return (
      <form
        onSubmit={event => {
          this.addTodo(event, this.Input.value);
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

export default TodoInput;
