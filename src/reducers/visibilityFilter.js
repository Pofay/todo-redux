export function visibilityFilter(state, action) {
  if (typeof state === "undefined") return "SHOW_ALL";
  switch (action.type) {
    case "SET_VISIBILITY_FILTER":
      return action.filter;
    default:
      return state;
  }
}
