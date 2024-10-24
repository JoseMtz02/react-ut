import { useReducer } from "react";


const initialState = {count: 0};

function reducer(state:any, action:any){
    switch(action.type){
        case 'increment':
            return {count: state.count + 1};
        case 'decrement':
            return {count: state.count -1};
        case 'reset':
            return initialState;
            default:
                throw new Error();
    }
}

export default function Counter(){

    const [state, dispatch] = useReducer(reducer, initialState);

    return(
        <div>
        <h1>Contador: {state.count} </h1>
        <button onClick={()=> dispatch({type: 'increment'})}>Aumentar</button>
        <button onClick={()=> dispatch({type: 'reset'})}>Resetear</button>
        <button onClick={()=> dispatch({type: 'decrement'})}>Disminuir</button>
        </div>
    )
}