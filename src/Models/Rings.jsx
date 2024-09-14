import { useFrame } from '@react-three/fiber'
import React, { useContext, useRef } from 'react'
import { Color } from 'three'


const Rings = ({inMotion,speed}) => {
    const itemsRef = useRef([]);
    let curSpeed = speed >= 4 ? speed/4 : speed;
    

    useFrame((state)=>{
        let t = state.clock.getElapsedTime()*curSpeed;
        for(let i=0;i<itemsRef.current.length;i++){
            let mesh = itemsRef.current[i];
            let z= (i-7) * 3.5;
            if(inMotion){
                z = (i-7) * 3.5 + ((t*0.4)%3.5)*3;
            }
            mesh.position.set(0,0,-z);

            let dist = Math.abs(z);
            mesh.scale.set(1-dist*0.04,1-0.04*dist,1-dist*0.04)

            let colorScale = 1;

            if(dist > 2){
                colorScale = 1- (Math.min(dist,12)-2)/10;
            }
            colorScale+=0.5;


            if(i%2 == 1){ 
                mesh.material.emissive = new Color(6,0.15,0.7).multiplyScalar(colorScale)
            }else{
                mesh.material.emissive = new Color(0.1,0.7,3).multiplyScalar(colorScale)
            }
        }
    })
  return (
    <>
    {
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0].map((v,i)=>{
            return (
                <mesh key={i}
                castShadow
                receiveShadow
                position={[0,0,0]}
                ref={(el)=>{itemsRef.current[i]=el}}
                >
                    <torusGeometry args={[3.05,0.05,16,100]} />
                    <meshStandardMaterial emissive={[0.5,0.5,0.5]} color={[0,0,0]} />
                </mesh>
            )
        })
    }
    
    </>
  )
}

export default Rings
