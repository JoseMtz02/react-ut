import React, { useReducer, useMemo, useCallback , useState} from 'react';
import { Button } from '@mui/material';

interface ITask {
  id: any;
  text: string;
  completed: boolean;
}

const initialState:ITask[] = [];


const todoReducer = (state:ITask[], action:any) => {

  switch(action.type){
    case 'ADD_TODO':
      return [...state, {
        id:Date.now(),
        text:action.payload,
        completed:false
      }];
      case 'TOGLE_TODO':
        return state.map((todo:any) => 
          todo.id === action.payload ?
          {...todo, completed: ! todo.completed} : todo);
          default :
            return state;
  }
  
};

const ToDo = () => {

    const [state, dispatch] = useReducer(todoReducer, initialState); //maneja el estado de las tareas
    const  [newTodo, setNewTodo] = useState('');

    const add = useCallback(() => {
      if(newTodo.trim()){
        dispatch({type: 'ADD_TODO', 
          payload:newTodo
        });
        setNewTodo('')
      }

    },[newTodo]);


   return(
    <Button>sada</Button>
  );
  
}


export default ToDo;