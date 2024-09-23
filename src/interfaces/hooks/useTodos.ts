import { Todo } from '../interfaces/todoList.interface';
import { todoReducer } from '../hooks/todoReducer';
import { useReducer } from 'react';

const init = (): Todo[] => {
  return JSON.parse(localStorage.getItem('todos') || '[]');
};

export const useTodos = () => {
  const [todos, dispatch] = useReducer(todoReducer, [], init);

  const handleNewTodo = (todo: Todo) => {
    dispatch({ type: '[TODO] Add Todo', payload: todo });
  };

  const handleDeleteTodo = (id: number) => {
    dispatch({ type: '[TODO] Remove Todo', payload: id });
  };

  const handleToggleTodo = (id: number) => {
    dispatch({ type: '[TODO] Toggle Todo', payload: id });
  };

  return {
    todos,
    todosCount: todos.length,
    pendingTodosCount: todos.filter(todo => !todo.done).length,
    handleNewTodo,
    handleDeleteTodo,
    handleToggleTodo,
  };
};
