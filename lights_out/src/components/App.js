import React, {useEffect} from 'react'
import game from 'game/game'
import p5 from 'p5'
import SplitPane from 'react-split-pane'
import Aside from 'components/Aside'

export default function App() {
  const canvasDiv = React.createRef()
  const createP5 = () => {new p5(game, canvasDiv.current)}
  useEffect(createP5, [])
  return <>
    <SplitPane split="vertical" className="splitPane">
      <Aside style={{flex: 1, backgroundColor:'#ffffff'}}></Aside>
      <div ref={canvasDiv} style={{flex: 1, backgroundColor:'#bdf3ff'}}></div>
    </SplitPane>
  </>
}