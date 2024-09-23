import { TodoItemProps } from '../../interfaces/todoList.interface';
import { ListItem, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export const TodoItem = ({ todo, onDeleteTodo, onToggleTodo }: TodoItemProps) => {
  return (
    <ListItem
      secondaryAction={
        <IconButton edge="end" aria-label="delete" onClick={() => onDeleteTodo(todo.id)}>
          <DeleteIcon />
        </IconButton>
      }
    >
      <Typography
        variant="body1"
        style={{ textDecoration: todo.done ? 'line-through' : 'none', cursor: 'pointer' }}
        onClick={() => onToggleTodo(todo.id)}
      >
        {todo.description}
      </Typography>
    </ListItem>
  );
};
