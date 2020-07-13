import * as THREE from 'three'
import React, {useRef, useEffect, useMemo} from 'react'
import {extend, useThree, useFrame} from 'react-three-fiber'
import {EffectComposer} from 'three/examples/jsm/postprocessing/EffectComposer'
import {ShaderPass} from 'three/examples/jsm/postprocessing/ShaderPass'
import {RenderPass} from 'three/examples/jsm/postprocessing/RenderPass'
import {FXAAShader} from 'three/examples/jsm/shaders/FXAAShader'

extend({EffectComposer, ShaderPass, RenderPass})

export default function Effects() {
  const composer = useRef()
  const {scene, gl, size, camera} = useThree()

  useEffect(() => void composer.current.setSize(size.width, size.height), [
    size,
  ])

  useFrame(() => composer.current.render(), 1)

  return (
    <effectComposer
      ref={composer}
      args={[gl]}
    >
      <renderPass
        attachArray="passes"
        scene={scene}
        camera={camera}
      />
      <shaderPass
        attachArray="passes"
        args={[FXAAShader]}
        material-uniforms-resolution-value={[1 / size.width, 1 / size.height]}
        renderToScreen
      />
    </effectComposer>
  )
}
