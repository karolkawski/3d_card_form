import * as THREE from 'three';
// import {
//     OrbitControls
// } from "three/examples/jsm/controls/OrbitControls";
// import {
//     OBJLoader
// } from 'three/examples/jsm/loaders/OBJLoader.js';
import {
    useRef,
    useState,
    useMemo,
    useEffect
} from 'react'
import './Card.css'
// import {
//     FontLoader
// } from "three/examples/jsm/loaders/FontLoader";
// import moment from 'moment';
// import useDeviceDetect from '../utils/useDeviceDetect';
// import { Canvas, useFrame } from '@react-three/fiber'
import { useTexture } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Mesh } from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

export const setPreviewBoolean = () => {

}

const CameraController = () => {
    const { camera, gl } = useThree();
    useEffect(
        () => {
            const controls = new OrbitControls(camera, gl.domElement);
            
            return () => {
                controls.dispose();
            };
        },
        [camera, gl]
        );
        return null;
    };
    export default function Card({card}) {

    let Card3D = () => {
            const obj = useLoader(OBJLoader, "models/Credit_Card.obj");
            const texture = useTexture("test/TextureTest.jpg");
            const geometry = useMemo(() => {
              let g;
              obj.traverse((c) => {
                if (c.type === "Mesh") {
                  g = c.geometry;
                }
              });
              return g;
            }, [obj]);
          
            return (
              <mesh geometry={geometry} scale={0.7}>
                <meshPhysicalMaterial map={texture} />
              </mesh>
            );
    }
  
    useEffect(() => {

      

    }, [])

    useEffect(() => {


    }, [card])

    return ( <Canvas className="Card">
                <ambientLight />
                <pointLight position={[10, 10, 10]} />
                <CameraController />
                <Card3D/>
            </Canvas>)
} 