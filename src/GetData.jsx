import React, { useEffect, useRef, useState } from 'react';
import FillData from './FillData';
import Simulate from './Simulate';
const default_capacity = 8;
const default_items = 3
export function GetData(props) {
    const [capacity, setCapacity] = useState(default_capacity);
    const [items , setItems] = useState([])
    const [idcount , setIdcount] = useState(1);
    const [buildTable, setBuildTable] = useState(createMatrix(default_items,default_capacity,0));

    const [operation,setOperation] = useState(false);
   

    return (
        <>
        <label className="swap swap-rotate w-full text-center text-xl font-bold">
        <input type="checkbox" onClick={()=>setOperation(c=>!c)} />
        <div className="swap-on fill-current">Operation</div>
        <div className="swap-off fill-current">Data</div>
        </label>
        <div className='flex'>
            {
                !operation 
                ? <FillData  idcount={idcount} setIdcount={setIdcount} capacity={capacity} items={items} setCapacity={setCapacity} setItems={setItems}  />
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




