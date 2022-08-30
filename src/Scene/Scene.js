import {
    useRef,
    useMemo,
    useEffect
} from 'react'
import './Scene.css'
import { extend } from '@react-three/fiber'
import { useTexture } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import Hevetiker from '../fonts/helvetiker_regular.typeface.json'

export const setPreviewBoolean = () => {

}

const CameraController = () => {
    const { camera, gl } = useThree();
    useEffect(
        () => {
            const controls = new OrbitControls(camera, gl.domElement);
            controls.distance = 10;
            controls.minDistance = 10;
            controls.maxDistance = 10;
            return () => {
                controls.dispose();
            };
        },
        [camera, gl]
        );
        return null;
    };

    export default function Scene({card}) {
      const mesh = useRef(null)

    

      // useFrame(() => {
      //   // animation code goes here
      // })

      // const TextMesh = ({text, position, rotation, font, size}) => {

      //   return  <mesh position={[1.5,3.9,0.1]} rotation={[0, 0, -Math.PI/2]}>
      //     <textGeometry attach='geometry' args={[`Revoult`, {
      //       font,
      //       size: 0.5,
      //       height: 0.01,
      //     }]} />
      //       <meshStandardMaterial attach='material' />
      //     </mesh>

      // }

     const Card3D = () => {

            const obj = useLoader(OBJLoader, "models/Credit_Card.obj");
            const texture = useTexture("test/TextureTest.jpg");

            const font = new FontLoader().parse(Hevetiker);
            extend({ TextGeometry })


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
              <group rotation={[0, 0, Math.PI/3]}>
                <mesh geometry={geometry}>
                  <meshPhysicalMaterial map={texture} />
                  <group >
                    <mesh position={[-2.3,3.9,0.1]} rotation={[0, 0, -Math.PI/2]}>
                    <textGeometry attach='geometry' args={[`${card.first_name} ${card.last_name}`, {
                      font,
                      size: 0.4,
                      height: 0.01,
                    }]} />
                    <meshStandardMaterial attach='material' />
                    </mesh>

                    <mesh position={[1.5,3.9,0.1]} rotation={[0, 0, -Math.PI/2]}>
                      <textGeometry attach='geometry' args={[`Revoult`, {
                        font,
                        size: 0.5,
                        height: 0.01,
                      }]} />
                      <meshStandardMaterial attach='material' />
                    </mesh>

                    <mesh position={[-1,3.9,0.1]} rotation={[0, 0, -Math.PI/2]}>
                      <textGeometry attach='geometry' args={[card.card_number, {
                        font,
                        size: 0.5,
                        height: 0.01,
                      }]} />
                      <meshStandardMaterial attach='material' />
                      </mesh>

                      <mesh position={[-1.5,0,0.1]} rotation={[0, 0, -Math.PI/2]}>
                      <textGeometry attach='geometry' args={['VALID THRU', {
                        font,
                        size: 0.15,
                        height: 0.01,
                      }]} />
                      <meshStandardMaterial attach='material' />
                    </mesh>

                    <mesh position={[-1.8,0,0.1]} rotation={[0, 0, -Math.PI/2]}>
                      <textGeometry attach='geometry' args={[`${card.card_exp}`, {
                        font,
                        size: 0.15,
                        height: 0.01,
                      }]} />
                      <meshStandardMaterial attach='material' />
                    </mesh>

                    <mesh position={[-1,3.9,-0.1]} >
                      <textGeometry attach='geometry' args={[card.card_secure, {
                        font,
                        size: 0.3,
                        height: 0.01,
                      }]} />
                      <meshStandardMaterial attach='material' />
                    </mesh>
                  </group>
                </mesh>
              </group>
            );
    }
  

    useEffect(() => {


    }, [card])

    return ( <Canvas className="Scene" style={{
                  height: '500px',
                  maxWidth: '100vw'
                }} ref={mesh}>
                <ambientLight />
                <pointLight position={[10, 10, 10]} />
                <CameraController />
                <Card3D />
            </Canvas>)
} 