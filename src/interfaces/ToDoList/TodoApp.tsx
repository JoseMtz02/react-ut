import { useCallback, useMemo } from "react";
import { TodoList } from "./TodoList";
import { TodoAdd } from "./TodoAdd";
import { useTodos } from "../../hooks/useTodos";
import { Todo } from '../../interfaces/todoList.interface';
import { Grid, Typography, Divider, Box } from '@mui/material';

export const TodoApp = () => {
  const { todos, pendingTodosCount, todosCount, handleDeleteTodo, handleToggleTodo, handleNewTodo } = useTodos();

  const memoizedTodosCount = useMemo(() => todosCount, [todosCount]);
  const memoizedPendingTodosCount = useMemo(() => pendingTodosCount, [pendingTodosCount]);

  const handleNewTodoCallback = useCallback((todo: Todo) => handleNewTodo(todo), [handleNewTodo]);
  const handleDeleteTodoCallback = useCallback((id: number) => handleDeleteTodo(id), [handleDeleteTodo]);
  const handleToggleTodoCallback = useCallback((id: number) => handleToggleTodo(id), [handleToggleTodo]);

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" component="h1" gutterBottom>
      <small> Tareas: {memoizedTodosCount},Pendientes: {memoizedPendingTodosCount}</small>
      </Typography>
      <Divider sx={{ marginBottom: 2 }} />

      <Grid container spacing={2}>
        <Grid item xs={12} md={5}>
          <Typography variant="h6" gutterBottom>
            Agregar Tarea
          </Typography>
          <Divider sx={{ marginBottom: 2 }} />
          <TodoAdd onNewTodo={handleNewTodoCallback} />
        </Grid>

        <Grid item xs={12} md={7}>
          <TodoList 
            todos={todos} 
            onDeleteTodo={handleDeleteTodoCallback}
            onToggleTodo={handleToggleTodoCallback} 
          />
        </Grid>
      </Grid>
    </Box>
  );
};
