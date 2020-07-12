import React, {useRef, useMemo, useEffect} from 'react'
import {DoubleSide} from 'three'
import {useFrame} from 'react-three-fiber'
import {ShaderMaterial} from 'three'

import {useAssets, useTexture} from '~js/hooks'

// import vertex from '~shaders/plane.vert'
// import fragment from '~shaders/plane.frag'

export default () => {
  const mesh = useRef()
  const img = useAssets('images/1.jpg')
  const imgTexture = useTexture(img)

  const uniforms = useMemo(() => ({
    uTime: {value: 0},
    uTexture: {value: imgTexture},
  }), [imgTexture])

  const material = useMemo(() => {
    const mat = new ShaderMaterial({
      uniforms: uniforms,
      // vertexShader: vertex,
      // fragmentShader: fragment,
      side: DoubleSide,
    })

    return mat
  }, [])

  useEffect( () => {
    if (material) {
      material.uniforms.uTexture.value = imgTexture
    }
  }, [imgTexture])

  useFrame(()=> {
    material.uniforms.uTime.value += 0.01
  })

  return (
    <>
      <mesh
        ref={mesh}
      >
        <planeBufferGeometry
          attach="geometry"
          args={[0.512, 0.512, 16, 16]}
        />
        <primitive
          object={material}
          attach="material"
        />
      </mesh>
    </>
  )
}
