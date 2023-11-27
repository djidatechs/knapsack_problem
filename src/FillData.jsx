import React, { useEffect, useRef } from 'react';
const default_items = 3
function FillData({capacity,items,setCapacity , setItems,idcount,setIdcount}) {
    const inc = () =>{
        setIdcount(c=>c+1)
        return idcount;
    }
    const addItem = () => setItems(
        current=>[
            ...current,
            {
                name :"Item "+ inc(),
                value : 10 , 
                weight : 5 ,
            }]
    )
    const deleteItem = (indexToRemove) => setItems(
        current => current.filter((_, index) => index !== indexToRemove)
    )
    const updateItem = (new_item_props, index)=> 
        
        setItems (
            current=>{
                const Item = current[index]
                Object.keys(new_item_props).map(prop => Item[prop] = new_item_props[prop])
                current[index] = Item
                return [...current];
            }
        )

    
    
        // useEffect(()=>{
        //     for (let i = 0 ; i < default_items ; i++) addItem();
        // },[])


    return (
        <div className='w-full flex justify-center'>
        <div className='w-full md:w-[70%] lg:w-[50%] h-[calc(100vh-120px)] pt-3 md:p-10 '>
                <h1 className='w-full text-center'>Filling Data</h1>
                <div className='h-full overflow-auto'>
                    <div className='space-x-4 p-2 border-none max-w-md'>
                        <label htmlFor="capacity font-bold">Capacity</label>
                        <input
                        onInput={(e)=>setCapacity(parseInt(e.target.value))}
                        value={capacity} name='capacity' type="number" min={0} placeholder="Ecrire ici" className=" w-full max-w-xs bg-base-100 " />
                    </div>
                    <div className="overflow-x-auto mt-2">
                        <table className="table bg-slate-900 ">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Item</th>
                                    <th>Value</th>
                                    <th>Weight</th>
                                    <th className='max-w-xs'>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    items.map((item,index) => (
                                        <tr className='text-lg' key={index}>
                                        <th>{index}</th>
                                        <td>
                                            <input
                                            className='w-20'
                                            onInput={(e)=>updateItem({name : e.target.value},index)}
                                            type='text'  value={item.name}
                                            />
                                         </td>
                                        <td>
                                            <input
                                            className='w-10'
                                            onInput={(e)=>updateItem({value : parseInt(e.target.value)},index)}
                                            type='number' min={0}  value={item.value}
                                            />
                                        </td>
                                        <td>
                                            <input
                                            className='w-10'
                                            onInput={(e)=>updateItem({weight : parseInt(e.target.value)},index)}
                                            type='number' min={0}  value={item.weight}
                                            />
                                        </td>
                                        <td className='max-w-xs cursor-pointer' onClick={()=>deleteItem(index)}>
                                            Delete
                                        </td>
                                    </tr>
                                    ))
                                }
                               
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td 
                                    onClick={addItem}
                                    colSpan={5} className='cursor-pointer bg-success text-white font-semibold text-center text-xl hover:bg-slate-600 transform duration-200'>+ add Item</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </div>
            </div>
    );
}

export default FillData;