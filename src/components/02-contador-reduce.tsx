import React, {useReducer} from 'react';
import {Button, Typography, Box} from '@mui/material';


const initialState = {count: 0};

function reducer(state: any, action: any){
    switch(action.type){
        case 'increment':
            return {count: state.count + 1};
        case 'decrement':
            return {count: state.count -1};
            default:
                throw new Error();
    }
}

function Counter(){
    const [state, dispatch] = useReducer(reducer, initialState);

    return(
        <Box display='flex' justifyContent='center' sx={{mb:4}}>
        <Typography variant="h5" >Count: {state.count}</Typography>
        <Button variant="text" onClick={() => dispatch({type:'decrement'})}>-</Button>
        <Button variant="text" onClick={() => dispatch({type:'increment'})}>+</Button>


        </Box>
    );
}

export default Counter;