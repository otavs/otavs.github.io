import React from 'react'
import ReactDOM from 'react-dom'
import 'index.css'
import 'resizer.css'
import App from 'components/App'

document.querySelector('mousedown', (e) => {
  e.preventDefault()
})  

ReactDOM.render(<App/>, document.getElementById('root'))
