import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './components/AppRoutes'
import Footer from './components/Footer'
import Header from './components/Header'
import './styles/null.scss'
import './styles/main.scss'

const App = () => {
  return (
    <BrowserRouter>
      <Header/>
        <div className='content' >
          <div className='container'>
            <AppRoutes/>
          </div>
        </div>
      <Footer/>
    </BrowserRouter>
  )
}

export default App