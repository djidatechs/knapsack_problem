import React from 'react';
function FillData({capacity,items,setCapacity , setItems,idcount}) {
    const inc = () =>{
        idcount.current ++ ; 
        return idcount.current;
    }
    const addItem = (v=10,w=5) => setItems(
        current=>[
            ...current,
            {
                name :"Item "+ inc(),
                value : v , 
                weight : w ,
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
        );

        const generateRandomItems = (N) => {
            const max = 15, min=5;
            for (let i = 0; i < N; i++) {
              const randomValue = Math.floor(Math.random() * ((max*2) - min + 1)) + min;
              const randomWeight = Math.floor(Math.random() * (max - min + 1)) + min;
              addItem(randomValue, randomWeight);
            }
          };
    return (
        <div className='w-full flex justify-center'>
        <div className='w-full md:w-[80%] lg:w-[70%] h-[calc(100vh-120px)] pt-3 md:p-10 '>
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
                                        <th>{index+1}</th>
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
                                    onClick={()=>addItem()}
                                    colSpan={2} className='cursor-pointer bg-success text-white font-semibold text-center text-xl hover:bg-slate-600 transform duration-200'>+ add one Item</td>
                                    <td 
                                    onClick={()=>generateRandomItems(parseInt(document.getElementById("items_num")?.value)||1 )}
                                    colSpan={3} className='cursor-pointer bg-green-600 text-white font-semibold text-center text-xl hover:bg-slate-600 transform duration-200'>Make <input id='items_num' className='bg-white text-black max-w-[30px] text-center' onClick={(e)=>e.stopPropagation()} defaultValue={"10"}/> Items</td>
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