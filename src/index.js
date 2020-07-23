import * as THREE from 'three';
import ReactDOM from 'react-dom';
import React, { Suspense } from 'react';
import { Canvas, useLoader } from 'react-three-fiber';
import image from './img/allan.jpg';
import Effects from './Effects';
import './shaders/RGBShift';
import './styles.css';

const Image = () => {
  const texture = useLoader(THREE.TextureLoader, image);
  return (
    <mesh>
      <planeBufferGeometry attach="geometry" args={[1, 1, 32, 32]} />
      <meshBasicMaterial attach="material" map={texture} />
    </mesh>
  );
};

ReactDOM.render(
  <Canvas camera={{ position: [0, 0, 1.5] }}>
    <Suspense fallback={null}>
      <Image />
    </Suspense>
    <Effects />
  </Canvas>,
  document.getElementById('root'),
);
