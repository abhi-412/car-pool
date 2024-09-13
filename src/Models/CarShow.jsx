import React from 'react';
import {  CubeCamera, Environment, OrbitControls, PerspectiveCamera } from '@react-three/drei'
import Ground from './Background';
import CarModel from './CarModel';
import Rings from './Rings';
import Boxes from './Box';
import {Bloom, ChromaticAberration, DepthOfField, EffectComposer} from "@react-three/postprocessing";
import {BlendFunction} from "postprocessing";
import FloatingGrid from './FloatingGrid';
const Car = ({inMotion}) => {
  return (
    <>
        <PerspectiveCamera fov={50} makeDefault position={[3, 2, 5]} />
        <OrbitControls target={[0,0.35,0]} maxPolarAngle={1.45}/>

        <color args={[0,0,0]} attach={"background"} />
        

        <spotLight 
            position={[5,5,0]}
            angle={0.6}
            penumbra={0.5}
            intensity={50}
            castShadow
            color={[1,0.25,0.7]}
            shadow-bias={-0.0001}
            // shadow-mapSize={[1024,1024]}
        />

        <spotLight 
            color={[0.14,0.5,1]}
            angle={0.6}
            penumbra={0.5}
            intensity={50}
            castShadow
            shadow-bias={-0.0001}
            position={[-5,5,0]}
            // shadow-mapSize={[1024,1024]}
        />


        <CubeCamera resolution={256} frames={Infinity}>
            {(texture) => (
                <>
                <Environment map={texture} />
                <CarModel position={[0,0,0]} scale={[0.005,0.005,0.005]} inMotion={inMotion} /> 
                </>
            )}
            
        </CubeCamera>   
        <Ground inMotion = {inMotion} />
        <Rings inMotion = {inMotion} />
        <Boxes inMotion = {inMotion} />
        <FloatingGrid inMotion = {inMotion} />

        <EffectComposer>
            {/* <DepthOfField focusDistance={0.0035} focalLength={0.01} bokehScale={3} height={480} /> */}
            <Bloom
            blendFunction={BlendFunction.ADD}
                // mipmapBlur
                luminanceThreshold={0.15}
                luminanceSmoothing={0.025}
                height={300}
                intensity={0.2}
                kernelSize={5}
                width={300}

            />

            <ChromaticAberration
                blendFunction={BlendFunction.NORMAL}
                offset={[0.0005, 0.0015]}
            />

        </EffectComposer>

    </>
  );
};

export default Car;
