import { TodoItem } from "./TodoItem";
import { TodoListProps } from "../../interfaces/todoList.interface";

import { List } from '@mui/material';

export const TodoList = ({ todos = [], onDeleteTodo, onToggleTodo }: TodoListProps) => {
  return (
    <List>
      {todos.map(todo => (
        <TodoItem 
          key={todo.id}
          todo={todo}
          onDeleteTodo={onDeleteTodo}
          onToggleTodo={onToggleTodo}
        />
      ))}
    </List>
  );
};
