import React, { useReducer, useMemo, useCallback, useState } from 'react';
import { Typography, Box, Button, Grid, TextField, Paper, Checkbox } from '@mui/material';

interface ITask {
  id: number;
  text: string;
  completed: boolean;
}

const initialState: ITask[] = [];

const todoReducer = (state: ITask[], action: any) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        {
          id: Date.now(),
          text: action.payload,
          completed: false,
        },
      ];
    case 'TOGGLE_TODO':
      return state.map(todo =>
        todo.id === action.payload ? { 
          ...todo,
           completed: !todo.completed } : todo
      );
    case 'REMOVE_TODO':
      return state.filter(todo => todo.id !== action.payload);
    default:
      return state;
  }
};

const ToDo = () => {
  const [state, dispatch] = useReducer(todoReducer, initialState);
  const [newTodo, setNewTodo] = useState('');

  const addTask = useCallback(() => {
    if (newTodo.trim()) {
      dispatch({ type: 'ADD_TODO', payload: newTodo });
      setNewTodo('');
    }
  }, [newTodo]);

  const removeTask = useCallback((id: number) => {
    dispatch({ type: 'REMOVE_TODO', payload: id });
  }, []);

  const toggleTask = useCallback((id: number) => {
    dispatch({ type: 'TOGGLE_TODO', payload: id });
  }, []);

  const completedCount = useMemo(() => {
    return state.filter(task => task.completed).length;
  }, [state]);

  return (
    <Box sx={{ padding: 2, maxWidth: 400, margin: 'auto' }}>
      <Typography variant="h5" align="center" gutterBottom>
        Lista de Tareas
      </Typography>

      <form
        onSubmit={e => { e.preventDefault(); addTask();  }} >
        <Grid container spacing={1} justifyContent="center" alignItems="center">
          <Grid item xs={8}>
            <TextField
              fullWidth
              size="small"
              variant="outlined"
              label="Añadir tarea"
              value={newTodo}
              onChange={e => setNewTodo(e.target.value)}
              placeholder="Escribe tu tarea..."
            />
          </Grid>
          <Grid item xs={4}>
            <Button type="submit" variant="contained" color="primary" fullWidth size="small">
              Agregar
            </Button>
          </Grid>
        </Grid>
      </form>

      <Box sx={{ marginTop: 2 }}>
        <Typography variant="subtitle1">Tareas ({state.length})</Typography>
        <Typography variant="body2">Completadas: {completedCount}</Typography>
      </Box>

      <Grid container spacing={1} sx={{ marginTop: 2 }}>
        {state.map(task => (
          <Grid item xs={12} key={task.id}>
            <Paper
              elevation={1}
              sx={{
                padding: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Checkbox
                  size="small"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                />
                <Typography
                  variant="body2"
                  sx={{ textDecoration: task.completed ? 'line-through' : 'none' }}
                >
                  {task.text}
                </Typography>
              </Box>
              <Button
                variant="outlined"
                color="warning"
                size="small"
                onClick={() => removeTask(task.id)}
              >
                Eliminar
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ToDo;
