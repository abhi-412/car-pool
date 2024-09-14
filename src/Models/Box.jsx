import { useFrame } from '@react-three/fiber';
import React, { useContext, useRef, useState } from 'react'
import { Vector3 } from 'three';


export const Box = ({color,inMotion,speed}) => {
    const boxRef = useRef();
    const timeRef = useRef();
    const [rotateX] = useState(Math.random());
    const [rotateY] = useState(Math.random());
    const [scale] = useState(Math.pow(Math.random(),2.0)*0.5+0.05);




    let initialPosition = () => {
        let v = new Vector3((Math.random()*2-1)*3,Math.random()*2.5+0.1,(Math.random()*2-1)*15);
        if(v.x >= 0) v.x += 1.75;
        if(v.x <= 0) v.x -= 1.75;

        return v;
    }
    const [position,setPosition] = useState(initialPosition());

    let resetPosition = () => {
        let v = new Vector3((Math.random()*2-1)*3,Math.random()*2.5+0.1,Math.random()*10 + 10);
        if(v.x >= 0) v.x += 1.75;
        if(v.x <= 0) v.x -= 1.75;

        setPosition(v);
    }


    useFrame((state,delta)=>{
        if(inMotion){
            timeRef.current += delta *1.2*speed;
        let newZ = position.z - (timeRef.current);
        if(newZ < -10){
            resetPosition();
            timeRef.current = 0;
        }
        }
        boxRef.current.position.set(position.x,position.y,position.z);
        boxRef.current.rotation.x += rotateX * delta *(speed/2);
        boxRef.current.rotation.y += rotateY * delta *(speed/2);
    },[position,rotateX,rotateY])

  return (
    <>
    <mesh scale={scale} ref={boxRef} castShadow>
        <boxGeometry args={[1,1,1]} />
        <meshStandardMaterial color={color} envMapIntensity={0.15} />
    </mesh>
    
    </>
  )
}

const Boxes = ({inMotion,speed}) => {
    return (
        <>
        {[0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0].map((v,i)=>{
            return (
                <Box key={i} color={i%2==1 ? [0.4,0.1,0.1] : [0.05,0.15,0.4]} inMotion={inMotion} speed={speed} />
            )
        })
        }
        </>
    )
}

export default Boxes;
