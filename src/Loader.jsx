import React, { useEffect, useState } from 'react'
import gsap from 'gsap'




const Loader = () => {
    useEffect(()=>{
        gsap.fromTo('#loader',{
            opacity:0,
            duration:2,
            ease:'power1.in',
            stagger:0.2,

        },{
            opacity:1,
            duration:2,

        })

        gsap.fromTo('#preloader',{
            y:20,
            duration:5,
            css:{
                fontWeight: "normal"
            },
            stagger:1,

        },{
            y:0,
            duration:5,
            css:{
                fontWeight: "bold"
            },
            ease:"circ.in"
        })
    },[])

    const [counter,setCounter] = useState(1);

    const incrementCounter = (counter)=>{
        if(counter < 100){
            setTimeout(()=>{
                setCounter(counter+1);
            },150)
        }else{
            setCounter("100% Please Wait!!");
        }
    }

    useEffect(()=>{
        incrementCounter(counter);
    },[counter])

  return (
    <div  className='w-full text-white h-screen flex flex-col gap-4 justify-center items-center'>
        <div id='preloader' className='flex gap-2 text-lg'>
            <span>3D,</span>
            <span>Animation,</span>
            <span>Development</span>
        </div>
        <div id='loader' className='relative'>
        <h1 className='absolute top-0 left-5 font-semibold right-0 text-black text-base z-10'>{counter < 100 ? `Loading...  ${counter}%` : counter}</h1>
        <style>
        {`
          input[type="range"]::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            background: rgb(255, 255, 255);
            height: 1.5rem;
            width: ${counter/5.55}rem;
            cursor: pointer;
          }
        `}
      </style>
        <input id='range'  className='h-6 w-[20%]' type="range" defaultValue={0} />
        </div>
    </div>
  )
}

export default Loader
