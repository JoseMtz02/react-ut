import { useForm } from "../../hooks/useForm";
import { TodoAddProps } from "../../interfaces/todoList.interface";
import { TextField, Button } from '@mui/material';

export const TodoAdd = ({ onNewTodo }: TodoAddProps) => {
  const { description, onInputChange, onResetForm } = useForm({ description: '' });

  const onFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (description.length <= 1) return;

    const newTodo = {
      id: new Date().getTime(),
      done: false,
      description,
    };

    onNewTodo(newTodo);
    onResetForm();
  };

  return (
    <form onSubmit={onFormSubmit}>
      <TextField
        label="¿Qué hay que hacer?"
        variant="outlined"
        fullWidth
        name="description"
        value={description}
        onChange={onInputChange}
        margin="normal"
      />
      <Button 
        type="submit" 
        variant="outlined" 
        color="primary" 
        fullWidth
        sx={{ mt: 1 }}
      >
        Agregar
      </Button>
    </form>
  );
};
  