import React, { useCallback, useState } from "react";



export default function ItemList(){

    const [item, setItem] = useState<string[]>([]);
    const [newItem, setNewItem] = useState('');
    
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>{
        setNewItem(event.target.value);
    }
    const addItem = useCallback(() => {
        if(newItem.trim() !== ''){
            setItem((valorDefault)=> [...valorDefault, newItem]);
        }
        setNewItem('');
    }, [newItem]);

    return(
        <div>
        <input 
        type="text"
        value={newItem}
        onChange={handleChange}
        placeholder="ingrese texto"
        />
        <button onClick={addItem}>Agregar a la lista</button>
        <ul>
        {item.map((item,index)=>(
            <li key={index}>{item}</li>
        ))}
        </ul>
        </div>
    )
}