import * as THREE from 'three'
import React, {useRef, useEffect, useMemo} from 'react'
import {extend, useThree, useFrame} from 'react-three-fiber'
import {EffectComposer} from 'three/examples/jsm/postprocessing/EffectComposer'
import {ShaderPass} from 'three/examples/jsm/postprocessing/ShaderPass'
import {RenderPass} from 'three/examples/jsm/postprocessing/RenderPass'

import vertex from '~shaders/effect.vert'
import fragment from '~shaders/effect.frag'

extend({EffectComposer, ShaderPass, RenderPass})

export default function Effects({ mouse }) {
  const composer = useRef()
  const {scene, gl, size, camera} = useThree()

  const uniforms = useMemo(() => ({
    'tDiffuse': { value: null },
    'resolution': { value: new THREE.Vector2(1., window.innerHeight / window.innerWidth) },
    'uMouse': { value: new THREE.Vector2(-10, -10) },
    'uVelo': { value: 0 },
  }), [])

  const material = useMemo(() => {
    const mat = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: vertex,
      fragmentShader: fragment,
    })

    return mat
  }, [])

  useEffect(() => void composer.current.setSize(size.width, size.height), [
    size,
  ])

  useFrame(() => {
    const mouseX = mouse.current[0]
    const mouseY = mouse.current[1]
    material.uniforms.uMouse.value.x = mouseX
    material.uniforms.uMouse.value.y = mouseY
    composer.current.render()
  }, 1)

  // effectComposer args?
  // Renderer size?
  // useFrame params?

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
        args={[material]}
        renderToScreen
        material-uniforms-resolution-value={[1 / size.width, 1 / size.height]}
      />
    </effectComposer>
  )
}
