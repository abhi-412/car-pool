import React, { createContext, Suspense, useState } from 'react';
import { Canvas } from "@react-three/fiber";
import Car from './Models/CarShow';
import './App.css';
import { BsArrowRight,BsArrowLeft } from "react-icons/bs";

function App() {
  const [inMotion,setInMotion] = useState(false);
  return (
    <section className='w-full h-screen relative'>


    <div id="drawer-navigation" className={`fixed xl:bottom-40 bottom-10   hover:scale-110 flex items-center justify-center p-4 left-10 z-40 w-50 transition-transform  bg-transparent ${!inMotion ? "" : "hidden"}`} tabIndex="-1" aria-labelledby="drawer-navigation-label">
          
          <button onClick={()=>{setInMotion(true)}} className='flex gap-2 items-center text-gray-300 justify-center text-xl'>
          <BsArrowLeft className='font-light' />
              <span className="text-nowrap">Motion View</span>
          </button>
        
      </div>

    

    <Suspense fallback={<p>Loading...</p>}>
      <Canvas shadows>
        <Car inMotion = {inMotion}/>
      </Canvas>
    </Suspense>


    <div id="drawer-navigation" className={`fixed xl:bottom-40 bottom-10  flex items-center justify-center p-4 right-10 z-40 w-[250px]  ${!inMotion ? "hidden" : ""}`} >



          <button onClick={()=>{setInMotion(false)}} className='flex gap-2 items-center text-gray-300 justify-center text-xl'>
              Model View
              <BsArrowRight />
          </button>
        
      </div>
    
    </section>
  );
}

export default App;
