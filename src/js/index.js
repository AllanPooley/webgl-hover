import 'normalize.css'
import '~css/fonts.css'
import '~css/main.css'
import 'core-js/stable'
import 'regenerator-runtime/runtime'

import React, {useRef, useCallback, Suspense} from 'react'
import {render} from 'react-dom'

import Canvas from '~js/components/Canvas'
import Camera from '~js/components/Canvas/Camera'
import Effects from '~js/components/Canvas/Effects'
import Environment from '~js/components/Canvas/Environment'

/**
 * app
 */
const App = () => {
  const mouse = useRef([0, 0])
  const onMouseMove = useCallback(
    ({clientX: x, clientY: y}) => ( mouse.current = [
      x - window.innerWidth / 2,
      y - window.innerHeight / 2
    ]), [])

  return (
    <>
      <Canvas onMouseMove={onMouseMove}>
        <Camera />
        <Environment mouse={mouse} />
        <Suspense>
          <Effects />
        </Suspense>
      </Canvas>
    </>
  )
}

/**
 * render app
 */
render(
  <App />,
  document.getElementById('app'),
)
