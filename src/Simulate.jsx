import React, { useEffect, useRef, useState } from 'react';
import Code from './Code';

function Simulate({capacity , items}) {
    const [maxValue, setMaxValue] = useState("??");
    const [build , load] = useState([]);
    const  [selectedItems,setSelectedItems] = useState([]);
    const colorCase = useRef({i:null,j:null});

    const bysteps = useRef(0);
    const autostep = useRef(false);
    const step_button = useRef(null);
    const speed = useRef(500);

    function waitForClick() {
        return new Promise((resolve) => {
          step_button.current.addEventListener('click', function handleClick() {
            document.removeEventListener('click', handleClick);
            resolve();
          });
        });
      }
      async function  next(){
        if (autostep.current) await new Promise((resolve) => setTimeout(resolve, 1000-speed.current)); 
        else  await waitForClick();
      }
      

    const startSimulation = ()=>{
        
        
        const _blink = async ()=>{
            const elements = document.getElementsByClassName("code_line_if_1");
            for (let i = 0; i < elements.length; i++) {
                elements[i].classList.add("bg-success")
                elements[i].classList.add("text-success-content")
            }
            
            await next();
            for (let i = 0; i < elements.length; i++) {
                elements[i].classList.remove("bg-success")
                elements[i].classList.remove("text-success-content")
            }
        }
        const dp_init = async()=>{
                bysteps.current =  1 ; 
                const elements = document.getElementsByClassName("code_line_x");
                for (let i = 0; i < elements.length; i++) {
                    elements[i].classList.add("bg-success")
                    elements[i].classList.add("text-success-content")
                }
                await next();
                for (let i = 0; i < elements.length; i++) {
                    elements[i].classList.remove("bg-success")
                    elements[i].classList.remove("text-success-content")
                }
        }
        const enter_if = async()=>{
            bysteps.current =  2 ; 
            await _blink();
            const elements = document.getElementsByClassName("code_line_if");
            for (let i = 0; i < elements.length; i++) {
                elements[i].classList.add("bg-success")
                elements[i].classList.add("text-success-content")
            }
            await next();
            for (let i = 0; i < elements.length; i++) {
                elements[i].classList.remove("bg-success")
                elements[i].classList.remove("text-success-content")
            }
        }
        const enter_else = async()=>{
            bysteps.current = 3 ; 
            await _blink();
            const elements = document.getElementsByClassName("code_line_else");
            for (let i = 0; i < elements.length; i++) {
                elements[i].classList.add("bg-success")
                elements[i].classList.add("text-success-content")
            }
            await next();
            for (let i = 0; i < elements.length; i++) {
                elements[i].classList.remove("bg-success")
                elements[i].classList.remove("text-success-content")
            }
        }

        const simulate_on = async ()=>{
          let n = items.length;
          let dp = Array(n + 1);
          for (let k = 0; k <= n; k++) {
              dp[k] = Array(capacity + 1).fill(0);
          }
          //dp_init
          await dp_init()
          load([...dp])
          async function  knapsack() {
              for (let i = 1; i <= n; i++) {
              for (let j = 1; j <= capacity; j++) {
                colorCase.current = {i,j};
                  if (items[i - 1].weight > j) {
                  dp[i][j] = dp[i - 1][j];
                  //enter_if 
                  await enter_if()
                  load([...dp])
                  } else {
                  dp[i][j] = Math.max(dp[i - 1][j - items[i - 1].weight] + items[i - 1].value , dp[i - 1][j]);
                  //enter_else
                  await enter_else()
                  load([...dp])
                  }
                  
              }
              }



                // Additional Traceback to find the selected items
                let i = n;
                let j = capacity;
                const selectedItems__ = []
                while (i > 0 && j > 0) {
                    if (dp[i][j] !== dp[i - 1][j]) {
                        selectedItems__.push(items[i - 1]);
                    j -= items[i - 1].weight;
                    }
                    i--;
                }
                setSelectedItems(selectedItems__)

              console.log(dp)
              return dp[n][capacity];
          }
          let mx = await knapsack()
          setMaxValue(mx)
        }
        simulate_on();
    }


    return (
        <>
        <div className='w-7/12 h-[calc(100vh-96px)] pt-3 p-10 '>
        <h1 
        onClick={()=>{
            console.log("hi")
            let elements = document.getElementsByClassName("code_line_x");
            console.log(elements)
            for (let i = 0; i < elements.length; i++) {
                elements[i].classList.add("bg-success")
                elements[i].classList.add("text-success-content")
            }
        }}
        className='w-full text-center cursor-pointer'>build table</h1>
            <div className='h-full overflow-auto'>
                <div className='space-x-4 p-2 border-none max-w-md'>
                     
                </div>
                <BuildTable dp={build} capacity={capacity} items={items} color_i={colorCase.current.i} color_j={colorCase.current.j}  />
            </div>
        </div>
        <div className='w-5/12 h-[calc(100vh-96px)] pt-3 px-10 '>
            <h1 className='w-full text-center'>Algorithm</h1>
            <Code/>
            <div className="join w-full mt-1 ">
                <button 
                onClick={startSimulation}
                className="btn bg-slate-800 rounded-md h-4  w-1/2 join-item">Start</button>
                <button ref={step_button} className="btn bg-slate-800 rounded-md h-4  w-1/2 join-item">Step</button>
            </div>
            
            <div className="form-control mt-2">
                <label className="label cursor-pointer">
                    <span className="label-text">speed&nbsp;<span id='spd'>500</span></span> 
                    <input 
                    onInput={(e)=>{document.getElementById('spd').textContent = e.target.value ; speed.current = e.target.value }}
                    name='speed' type="range" min={0} max="1000" defaultValue="500" className="w-[200px] range  " />
                </label>
            </div>

            <div className="form-control">
                <label className="label cursor-pointer">
                    <span className="label-text">Dont stop at each step</span> 
                    <input 
                    onInput={(e)=>{autostep.current = e.currentTarget.checked; console.log(e.currentTarget.checked) }}
                    type="checkbox" className="toggle" defaultChecked={false} />
                </label>
            </div>
            <div className='mt-2 font-bold text-lg' >max value : {maxValue}</div>
            <div className='mt-2 font-bold text-lg' >selected items :&nbsp; {selectedItems.length ?selectedItems.map(s=>s.name).reverse().join(" , "): " /"}</div>
            
        </div>
        </>
    );
}

export default Simulate;


const BuildTable = ({dp,capacity,items,color_i,color_j})=> (

    <div className="overflow-x-auto mt-2">
    <table className="table bg-slate-900 text-[16px] ">
        <thead>
                {
                    <StupidThHolder  capacity={capacity}/>
                }
        </thead>
        <tbody>
            <tr>
                <td></td>
            {dp && dp[0]?.length && dp[0].map(clm => <td>{clm}</td>  )}
            </tr>
                {
                    items.map((item,index)=>(
                    <tr>
                        <td>{item.name}</td>
                        {dp && dp[index+1]?.length && dp[index+1].map((clm,dp_index) => <td className={color_i===index+1&&color_j===dp_index?" bg-green-500 ":undefined}>{clm}</td>  )}
                    </tr>))
                }
        </tbody>
    </table>
</div>
)


const StupidThHolder = ({ capacity }) => {
    const [thElements, setThElements] = useState([]);
  
    useEffect(() => {
      const thElements_m = [];
      for (let i = 0; i <= capacity; i++) {
        thElements_m.push(
          <th key={i}>{i}</th> 
        );
      }
  
      setThElements(thElements_m);
    }, [capacity]); 
  
    return (

          <tr>
            <th></th>
            {thElements.map((Th, index) => (
              <React.Fragment key={index}>{Th}</React.Fragment>
            ))}
          </tr>
    );
  };