import React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { connect } from "react-redux";

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

export default TodoFilter;
