export interface Todo {
    id: number;
    description: string;
    done: boolean;
}

export interface TodoListProps{
    todos: Todo[];
    onDeleteTodo: (id:number) => void;
    onToggleTodo: (id:number) => void;
}

export interface TodoItemProps {
    todo: Todo;
    onDeleteTodo: (id: number) => void;
    onToggleTodo: (id: number) => void;
  }
  
  export interface TodoAddProps {
    onNewTodo: (todo: Todo) => void;
  }