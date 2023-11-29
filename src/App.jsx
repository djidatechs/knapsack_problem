import { Knapsack } from "./Knapsack"


function App() {

  return (
    <div className="p-relative select-none ">
      <div className={`flex justify-center`}>
        <div className={"w-full md:w-[95%] px-3 mx-3 mt-4 lg:mx-0 sm:px-0 max-w-[1500px]"}>
          <div>
            <div className="navbar max-h-14 min-h-max  w-full bg-slate-800 rounded-xl m-0 p-0">
                <div className="flex-1">
                  <a className="btn btn-ghost text-xl">TPRO : Le problème du sac à dos</a>
                </div>
                <div className="flex-none">
                    <a className="btn btn-ghost text-xl">Dandani & Djida SIQ2</a>
                </div>
            </div>

              <Knapsack/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
