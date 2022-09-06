import {
    useRef,
    useMemo,
    useEffect
} from 'react'
import './Scene.css'
import { extend } from '@react-three/fiber'
import { useTexture } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import Hevetiker from '../fonts/helvetiker_regular.typeface.json'
import moment from 'moment';

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
            controls.update();
            return () => {
                controls.dispose();
            };
        },
        [camera, gl]
        );
        return null;
    };

    export default function Scene({card, collapse, isMobile}) {
      const mesh = useRef();

      const TextMesh = ({data}) => {
        const {text, position, rotation, font, size} = data;

        return  <mesh position={position} rotation={rotation}>
          <textGeometry attach='geometry' args={[text, {
            font,
            size,
            height: 0.01,
          }]} />
            <meshStandardMaterial attach='material' />
          </mesh>

      }

     const Card3D = () => {

            const obj = useLoader(OBJLoader, "models/Credit_Card.obj");
            const texture = useTexture("test/TextureTest.jpg");

            const font = new FontLoader().parse(Hevetiker);
            extend({ TextGeometry })

            const texts = {
              card_owner: {
                position: [-2.3,3.9,0.1],
                text: `${card.first_name} ${card.last_name}`,
                rotation: [0, 0, -Math.PI/2],
                size: 0.4,
                font
              },
              bank_name: {
                position: [1.5,3.9,0.1],
                text: 'Revoult',
                rotation: [0, 0, -Math.PI/2],
                size: 0.5,
                font


              },
              card_number: {
                position: [-1,3.9,0.1],
                text: card.card_number,
                rotation: [0, 0, -Math.PI/2],
                size: 0.5,
                font
              },
              valid_thru: {
                position:[-1.5,0,0.1],
                text: 'VALID THTU',
                rotation: [0, 0, -Math.PI/2],
                size: 0.15,
                font
              },
              card_exp: {
                position:[-1.8,0,0.1],
                text: `${moment(card.card_exp).format('DD/MM/YYYY')}`,
                rotation: [0, 0, -Math.PI/2],
                size: 0.15,
                font
              },
              card_secure: {
                position:[-1,3.9,-0.1],
                text: card.card_secure,
                rotation: [0, 0, 0],
                size: 0.3,
                font
              }
            }
      
            const geometry = useMemo(() => {
              let g;
              obj.traverse((c) => {
                if (c.type === "Mesh") {
                  g = c.geometry;
                }
              });
              return g;
            }, [obj]);

            useEffect(()=> {
              console.log('update mesh')

            }, [])
          
            return (
              <group rotation={[0, 0, Math.PI/3]} ref={mesh}>
                <mesh geometry={geometry}>
                  <meshPhysicalMaterial map={texture} />
                  <group >
                    {Object.keys(texts).map((key) => {
                      const data = texts[key];
                      return <TextMesh data={data}/>
                    })}
                  </group>
                </mesh>
              </group>
            );
    }
  


    return ( <Canvas className={isMobile && collapse ? "Scene Scene__Collapse" : "Scene"} style={{
                  height: isMobile && collapse ? '100px' : '500px',
                  maxWidth: '100vw'
                }} ref={mesh}>
                <ambientLight />
                <pointLight position={[10, 10, 10]} />
                <CameraController distance={10}/>
                <Card3D />
            </Canvas>)
} 