import React, {useEffect} from 'react'
import game from './Game'
import p5 from 'p5'

export default function App() {
  const canvasDiv = React.createRef()
  const createP5 = () => {new p5(game, canvasDiv.current)}
  useEffect(createP5, [])
  return <>
    <div ref={canvasDiv}></div>
  </>
}