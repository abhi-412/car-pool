import React, { createContext, Suspense, useState } from 'react';
import { Canvas } from "@react-three/fiber";
import Car from './Models/CarShow';
import './App.css';
import { BsArrowRight,BsArrowLeft } from "react-icons/bs";
import { RiSpeedFill } from "react-icons/ri";
import { IoStopOutline,IoPlayOutline } from "react-icons/io5";
function App() {
  const [inMotion,setInMotion] = useState(false);
  const [speed,setSpeeed] = useState(1);
  const [rings,setRings] = useState(true);
  const [cubes,setCubes] = useState(true);
  const [car,setCar] = useState(true);
  return (
    <section className='w-full h-screen relative'>
    <Suspense fallback={<p>Loading...</p>}>
      <Canvas shadows>
        <Car inMotion = {inMotion} speed={speed} rings={rings} cubes={cubes} car={car}/>
      </Canvas>
    </Suspense>


    <div id="drawer-navigation" className={`fixed xl:bottom-40 bottom-10  flex items-center justify-center p-4 right-10 z-40 `}>



          <div className='flex flex-col p-5 gap-2 shadow-md items-center text-gray-300 justify-center bg-gray-900/50'>
              <h4 className='text-lg'>Controls</h4>
             <div className='flex flex-col gap-3'>

             <div className='flex gap-3 items-center justify-center'>
                <button className='' onClick={()=>{setInMotion(!inMotion); inMotion && setSpeeed(1) }}>{inMotion ?<div className='flex gap-1 items-center'><IoStopOutline   className='text-xl text-red-600' /> <span>Stop</span></div> : <div className='flex gap-1 items-center'><IoPlayOutline className='text-xl text-green-600' />Start</div>}</button>
              </div>

             <div className='flex flex-col'>
                  <div className='flex gap-3'>
                    <button onClick={()=>{setSpeeed(0.5)}} className='text-gray-300 flex items-center gap-1'>0.5x <RiSpeedFill /></button>
                    <button onClick={()=>{setSpeeed(10)}} className='text-gray-300 flex items-center gap-1'>1x <RiSpeedFill /></button>
                    <button onClick={()=>{setSpeeed(20)}} className='text-gray-300 flex items-center gap-1'>2x <RiSpeedFill /></button>
                    <button onClick={()=>{setSpeeed(30)}} className='text-gray-300 flex items-center gap-1'>3x <RiSpeedFill /></button>
                    <button onClick={()=>{setSpeeed(40)}} className='text-gray-300 flex items-center gap-1'>4x <RiSpeedFill /></button>
                  </div>
              </div>

              <div className='flex gap-3'>
              <div className="flex items-center me-4">
                  <input onChange={()=>{setRings(!rings)}} checked={rings} id="inline-radio" type="checkbox" value={rings} name="inline-radio-group" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                  <label htmlFor="inline-radio-1" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Rings</label>
              </div>
              <div className="flex items-center me-4">
                  <input onChange={()=>{setCubes(!cubes)}} checked={cubes} id="inline-radio" type="checkbox" value={cubes} name="inline-radio-group" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                  <label htmlFor="inline-radio-2" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Cubes</label>
              </div>

              <div className="flex items-center me-4">
                  <input onChange={()=>{setCar(!car)}} checked={car} id="inline-radio" type="checkbox" value={car} name="inline-radio-group" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                  <label htmlFor="inline-radio-2" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Car</label>
              </div>

               
              </div>
             
              
             </div>
          </div>
        
      </div>
    
    </section>
  );
}

export default App;
