import React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { connect } from "react-redux";

const filterValues = [
  { key: "All", value: "SHOW_ALL" },
  { key: "Completed", value: "SHOW_COMPLETED" },
  { key: "Active", value: "SHOW_ACTIVE" }
];

const mapStateToProps = state => ({ currentFilter: state.visibilityFilter });

const mapDispatchToProps = dispatch => ({
  changeFilter: event => {
    const filter = event.target.value;
    event.preventDefault();
    dispatch({
      type: "SET_VISIBILITY_FILTER",
      filter
    });
  }
});

const TodoFilter = ({ currentFilter, changeFilter }) => {
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoFilter);
