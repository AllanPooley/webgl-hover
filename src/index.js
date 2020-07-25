import * as THREE from 'three';
import ReactDOM from 'react-dom';
import React, { Suspense, useCallback, useRef } from 'react';
import { Canvas, useLoader } from 'react-three-fiber';
import image from './img/allan.jpg';
import Effects from './Effects';
import './shaders/RGBShift';
import './styles.css';

const Image = () => {
  const texture = useLoader(THREE.TextureLoader, image);
  return (
    <mesh>
      <planeBufferGeometry attach="geometry" args={[1, 1]} />
      <meshBasicMaterial attach="material" map={texture} />
    </mesh>
  );
};

const Scene = () => {
  const mouse = useRef([0, 0]);
  const onMouseMove = useCallback(({ clientX: x, clientY: y }) => (mouse.current = [x / window.innerWidth, 1.0 - (y / window.innerHeight)]), []);
  return (
    <Canvas onMouseMove={onMouseMove} camera={{ position: [0, 0, 1.5] }}>
      <Suspense fallback={null}>
        <Image />
      </Suspense>
      <Effects mouse={mouse} />
    </Canvas>
  );
};

ReactDOM.render(
  <Scene />,
  document.getElementById('root'),
);
