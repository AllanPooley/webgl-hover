import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import React, { useRef, useEffect } from 'react';
import { extend, useFrame, useThree } from 'react-three-fiber';
import './shaders/RGBShift';

extend({ EffectComposer, ShaderPass, RenderPass });

export default function Effects() {
  const composer = useRef();
  const shift = useRef();
  const {
    scene, gl, size, camera,
  } = useThree();
  useEffect(() => composer.current.setSize(size.width, size.height), [size]);
  useFrame((state) => {
    shift.current.mouse.x = THREE.MathUtils.lerp(shift.current.mouse.x, state.mouse.x * 100, 0.1);
    shift.current.mouse.y = THREE.MathUtils.lerp(shift.current.mouse.y, state.mouse.y * 100, 0.1);
    composer.current.render();
  }, 1);
  return (
    <effectComposer ref={composer} args={[gl]}>
      <renderPass attachArray="passes" scene={scene} camera={camera} />
      <rGBShift
        ref={shift}
        attachArray="passes"
        renderToScreen
        material-uniforms-resolution-value={[1 / size.width, 1 / size.height]}
      />
    </effectComposer>
  );
}
