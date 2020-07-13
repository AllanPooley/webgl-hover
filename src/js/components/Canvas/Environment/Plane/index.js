import React, {useRef, useMemo, useEffect} from 'react'
import * as THREE from 'three'
import {useFrame} from 'react-three-fiber'
import {ShaderMaterial} from 'three'

import {useAssets, useTexture} from '~js/hooks'

import vertex from '~shaders/plane.vert'
import fragment from '~shaders/plane.frag'

export default ({mouse}) => {
  const mesh = useRef()
  const img = useAssets('images/1.jpg')
  const imgTexture = useTexture(img)

  const uniforms = useMemo(() => ({
    uTime: {value: 0},
    uTexture: {value: imgTexture},
    tDiffuse: {value: null},
    resolution: {
      value: new THREE.Vector2(1, window.innerHeight/ window.innerWidth)
    },
    uMouse: {value: new THREE.Vector2(-10, -10)},
    uVelo: {value: 0},
  }), [imgTexture])

  const material = useMemo(() => {
    const mat = new ShaderMaterial({
      uniforms: uniforms,
      vertexShader: vertex,
      fragmentShader: fragment,
      side: THREE.DoubleSide,
    })

    return mat
  }, [])

  useEffect( () => {
    if (material) {
      material.uniforms.uTexture.value = imgTexture
    }
  }, [imgTexture])

  useEffect( () => {
    material.uniforms.uMouse.value = new THREE.Vector2(mouse.current[0], mouse.current[1])
  }, [mouse])

  useFrame(()=> {
    material.uniforms.uTime.value += 0.01
    // console.log({mouse})
  })

  return (
    <>
      <mesh
        ref={mesh}
      >
        <planeBufferGeometry
          attach="geometry"
          args={[0.512, 1.024, 16, 16]}
        />
        <primitive
          object={material}
          attach="material"
        />
      </mesh>
    </>
  )
}
