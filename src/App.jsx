import React, { createContext, Suspense, useEffect, useRef, useState } from 'react';
import { Canvas } from "@react-three/fiber";
import Car from './Models/CarShow';
import './App.css';
import { BsArrowRight,BsArrowLeft } from "react-icons/bs";
import { RiSpeedFill } from "react-icons/ri";
import { IoStopOutline,IoPlayOutline } from "react-icons/io5";
import audio from "./assets/sound.mp3";
import { MdMusicNote, MdMusicOff } from "react-icons/md";
import Loader from './Loader';
function App() {
  const [inMotion,setInMotion] = useState(false);
  const [speed,setSpeeed] = useState(10);
  const [rings,setRings] = useState(true);
  const [cubes,setCubes] = useState(true);
  const [car,setCar] = useState(true);
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);

  useEffect(() => {
    // Initialize the audio object
    audioRef.current = new Audio(audio);
    audioRef.current.volume = 0.4;
    audioRef.current.loop = true;
    audioRef.current.playbackRate = playbackRate;

    // Clean up the audio object on component unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
    };
  }, [audio]);

  const handleChangePlaybackRate = (v) => {
    const rate = parseFloat(v);
    setPlaybackRate(rate);
    if (audioRef.current) {
      audioRef.current.playbackRate = rate;
    }
  };

  const handlePlayAudio = () => {
    if (audioRef.current && inMotion) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(error => {
        console.error('Error playing audio:', error);
      });
    }else{
      alert("Car must be in motion!!")
    }
  };

  const handlePauseAudio = () => {

    
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };


  return (
    <Suspense fallback={<Loader />}>
    <section className='w-full h-screen relative'>

      <Canvas shadows>
        <Car inMotion = {inMotion} speed={speed} rings={rings} cubes={cubes} car={car}/>
      </Canvas>
      <div id="drawer-navigation" className={`fixed xl:bottom-40 bottom-0  flex items-center justify-center lg:p-4 p-1 xl:right-10 right-0 z-40 `}>



          <div className='flex flex-col lg:p-5 p-2 lg:gap-2 gap-1 shadow-md lg:text-base text-sm items-center text-gray-300 justify-center bg-gray-900/50'>
              <h4 className='xl:text-lg text-base'>Controls</h4>
             <div className='flex flex-col lg:gap-3 gap-2'>

             <div className='flex gap-3 items-center justify-center'>
                <button className='' onClick={()=>{setInMotion(!inMotion); inMotion && setSpeeed(1); isPlaying && handlePauseAudio()  }}>{inMotion ?<div className='flex gap-1 items-center'><IoStopOutline   className='text-xl text-red-600' /> <span>Stop</span></div> : <div className='flex gap-1 items-center'><IoPlayOutline className='text-xl text-green-600' />Start</div>}</button>
                
                <div className='flex gap-3'>
                <button className={`flex gap-2 items-center ${isPlaying ? "hidden" : ""}`}  onClick={handlePlayAudio} hidden={isPlaying} disabled={isPlaying}>
                  <MdMusicNote /> Music
                </button>
                <button  className={`flex gap-2 items-center ${!isPlaying ? "hidden" : ""}`} onClick={handlePauseAudio} hidden={!isPlaying} disabled={!isPlaying}>
                  <MdMusicOff /> Music
                </button>
              </div>
              </div>

             <div className='flex flex-col'>
                  <div className='flex gap-3 justify-center items-center'>
                    <button onClick={()=>{setSpeeed(0.5);handleChangePlaybackRate(0.25)}} className='text-gray-300 flex items-center gap-1'>0.5x <RiSpeedFill /></button>
                    <button onClick={()=>{setSpeeed(10);handleChangePlaybackRate(0.95)}} className='text-gray-300 flex items-center gap-1'>1x <RiSpeedFill /></button>
                    <button onClick={()=>{setSpeeed(30);handleChangePlaybackRate(1.05)}} className='text-gray-300 flex items-center gap-1'>3x <RiSpeedFill /></button>
                    <button onClick={()=>{setSpeeed(50);handleChangePlaybackRate(1.5)}} className='text-gray-300 flex items-center gap-1'>5x <RiSpeedFill /></button>
                  </div>
              </div>

              <div className='flex gap-2 justify-center items-center'>
              <div className="flex items-center me-2 cursor-pointer">
                  <input onChange={()=>{setRings(!rings)}} checked={rings} id="inline-radio" type="checkbox" value={rings} name="inline-radio-group" className="lg:w-4 lg:h-4 w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 cursor-pointer" />
                  <label htmlFor="inline-radio-1" className="ms-2 lg:text-sm text-xs font-medium text-gray-900 dark:text-gray-300">Rings</label>
              </div>
              <div className="flex items-center me-2 cursor-pointer">
                  <input onChange={()=>{setCubes(!cubes)}} checked={cubes} id="inline-radio" type="checkbox" value={cubes} name="inline-radio-group" className="lg:w-4 lg:h-4 w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 cursor-pointer" />
                  <label htmlFor="inline-radio-2" className="ms-2 lg:text-sm text-xs font-medium text-gray-900 dark:text-gray-300">Cubes</label>
              </div>

              <div className="flex items-center me-2 cursor-pointer">
                  <input onChange={()=>{setCar(!car)}} checked={car} id="inline-radio" type="checkbox" value={car} name="inline-radio-group" className="lg:w-4 lg:h-4 w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 cursor-pointer" />
                  <label htmlFor="inline-radio-2" className="ms-2 lg:text-sm text-xs font-medium text-gray-900 dark:text-gray-300">Car</label>
              </div>

               
              </div>
             
              
             </div>
          </div>
        
      </div>
      </section>
    </Suspense>
    
  );
}

export default App;
