const todo = (state, action) => {
  switch (action.type) {
    case "ADD-TODO":
      return {
        id: action.id,
        text: action.text,
        completed: action.completed || false
      };
    case "TOGGLE-TODO":
      return state.id !== action.id
        ? state
        : { ...state, completed: action.completed };
    default:
      return state;
  }
};

export function todos(state, action) {
  if (typeof state === "undefined") return [];
  switch (action.type) {
    case "ADD-TODO":
      return [...state, todo(undefined, action)];
    case "TOGGLE-TODO":
      return state.map(t => todo(t, action));
    default:
      return state;
  }
}
