import React, {useRef} from 'react'

import {useAssets, useTexture} from '~js/hooks'

export default () => {
  const mesh = useRef()
  const img = useAssets('images/1.jpg')
  const imgTexture = useTexture(img)

  return (
    <mesh ref={mesh}>
      <planeBufferGeometry
        attach="geometry"
        args={[0.512, 1.024, 16, 16]}
      />
      <meshBasicMaterial
        attach="material"
        map={imgTexture}
      />
    </mesh>
  )
}
