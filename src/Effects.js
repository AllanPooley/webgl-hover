import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import React, { useRef, useEffect } from 'react';
import { extend, useFrame, useThree } from 'react-three-fiber';
import './shaders/RGBShift';

extend({ EffectComposer, ShaderPass, RenderPass });

const Effects = ({ mouse }) => {
  const composer = useRef();
  const shift = useRef();
  const {
    scene, gl, size, camera,
  } = useThree();
  useEffect(() => composer.current.setSize(size.width, size.height), [size]);
  useFrame(() => {
    const mouseX = mouse.current[0] || 0;
    const mouseY = mouse.current[1] || 0;
    shift.current.mouse.x = mouseX;
    shift.current.mouse.y = mouseY;
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
};

export default Effects;
