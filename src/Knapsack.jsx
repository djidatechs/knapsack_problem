import React, { useEffect, useRef, useState } from 'react';
import FillData from './FillData';
import Simulate from './Simulate';
const default_capacity = 13;
export function Knapsack(props) {
    const [capacity, setCapacity] = useState(default_capacity);
    const [items , setItems] = useState([])
    const [operation,setOperation] = useState(false);
    const idcount = useRef(0);
   

    return (
        <>
        <label className="swap swap-rotate w-full text-center text-xl font-bold">
        <input type="checkbox" onClick={()=>setOperation(c=>!c)} />
        <div className="swap-on fill-current">Click to return</div>
        <div className="swap-off fill-current">Click to go to operation after filling data</div>
        </label>
        <div className='flex'>
            {
                !operation 
                ? <FillData  idcount={idcount} capacity={capacity} items={items} setCapacity={setCapacity} setItems={setItems}  />
                : <Simulate capacity={capacity} items={items}/> 
            } 
            
            
           
        </div>
        </>
    );
}



function createMatrix(rows, cols, initialValue = 0) {
    const matrix = [];
    for (let i = 0; i < rows; i++) {
        matrix.push(new Array(cols).fill(initialValue));
    }
    return matrix;
}




