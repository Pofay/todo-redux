const addTodo = (id, content, completed) => ({
  type: 'ADD-TODO',
  id: id,
  text: content,
  completed: completed
});

const toggleTodo = (id, completed) => ({
  type: 'TOGGLE-TODO',
  id: id,
  completed: completed
});

const addTodoRequest = (id, content) => ({
  type: 'ADD-TODO-REQUEST',
  id: id,
  text: content
});

const toggleTodoRequest = (id, completed) => ({
  type: 'TOGGLE-TODO-REQUEST',
  id: id,
  completed: !completed
});

const setVisibilityFilter = filter => ({
  type: 'SET_VISIBILITY_FILTER',
  filter
});

const watchTodos = () => ({
  type: 'WATCH-TODOS'
});

const unwatchTodos = () => ({
  type: 'UNWATCH-TODOS'
});

export {
  addTodo,
  toggleTodo,
  addTodoRequest,
  toggleTodoRequest,
  setVisibilityFilter,
  watchTodos,
  unwatchTodos
};
