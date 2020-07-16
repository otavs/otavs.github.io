import React, {useEffect} from 'react'
import game from 'game/game'
import p5 from 'p5'
import SplitPane, {Pane} from 'react-split-pane'
import Aside from 'components/Aside'

export default function App() {
  const canvasDiv = React.createRef()
  const createP5 = () => {new p5(game, canvasDiv.current)}
  useEffect(createP5, [])
  return <>
    <SplitPane split="vertical" paneStyle={{display: 'flex', flexDirection: 'column'}}>
      <Aside></Aside>
      <div ref={canvasDiv} style={{flex: 1, backgroundColor:'#95e6ff'}}></div>
    </SplitPane>
  </>
}