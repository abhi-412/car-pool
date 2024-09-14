import { useFrame, useLoader } from '@react-three/fiber';
import React, { useContext, useEffect, useRef } from 'react'
import { RepeatWrapping, TextureLoader } from 'three';

const FloatingGrid = ({inMotion,speed}) => {
    const gridRef = useRef();

    const diffuse = useLoader(TextureLoader, import.meta.env.VITE_APP_API_URL + 'textures/grid-texture.png');
    useEffect(()=>{
        diffuse.wrapS = RepeatWrapping;
        diffuse.wrapT = RepeatWrapping;
        diffuse.anisotropy = 4;
        diffuse.repeat.set(30,30);
        diffuse.offset.set(0,0);

    },[diffuse]);

    useFrame((state)=>{
       if(inMotion){
        let t = -state.clock.getElapsedTime()*speed;
        diffuse.offset.set(0, t);
       }
    })
  return (
    <>
        <mesh rotation-x={-Math.PI *0.5} position={[0,0.045,0]} ref={gridRef}>
            <planeGeometry args={[35,35]}/>
            <meshBasicMaterial 
                color={[1,1,1]}
                opacity={0.15}
                map={diffuse}
                alphaMap={diffuse}
                transparent={true}

            />
        </mesh>


    </>
  )
}

export default FloatingGrid
