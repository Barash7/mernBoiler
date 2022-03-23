import React from 'react'
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'
import { Provider } from 'react-redux'

import store from '../redux'
import Startup from './startup'
import Main from '../components/main'
import Cart from '../components/cart'

const Root = () => {
  return (
    <Provider store={store}>
      <Startup>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </BrowserRouter>
      </Startup>
    </Provider>
  )
}

export default Root
