import { Todo } from '../interfaces/todoList.interface';

type TodoAction =
  | { type: '[TODO] Add Todo'; payload: Todo }
  | { type: '[TODO] Remove Todo'; payload: number }
  | { type: '[TODO] Toggle Todo'; payload: number };

export const todoReducer = (state: Todo[], action: TodoAction): Todo[] => {
  switch (action.type) {
    case '[TODO] Add Todo':
      return [...state, action.payload];

    case '[TODO] Remove Todo':
      return state.filter(todo => todo.id !== action.payload);

    case '[TODO] Toggle Todo':
      return state.map(todo =>
        todo.id === action.payload ? { ...todo, done: !todo.done } : todo
      );

    default:
      return state;
  }
};
