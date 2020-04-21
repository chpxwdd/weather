import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { store } from './store/store'
import { BrowserRouter } from 'react-router-dom'
import registerServiceWorker from './services/register'
import Root from './components/root'

render(
  <div>
    <Provider store={store}>
      <BrowserRouter>
        <Root />
      </BrowserRouter>
    </Provider>
  </div>,
  document.getElementById('root')
)

registerServiceWorker()
