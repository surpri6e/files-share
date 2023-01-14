import React from 'react'
import { publicRoutes } from '../routes/routes'
import { Route, Routes } from 'react-router-dom'
import NothingPage from '../pages/NothingPage'

const AppRoutes = () => {
  return (
    <Routes>
    {
        publicRoutes.map((el) => 
            <Route key={el.path} element={<el.component/>} path={el.path}/>
        )
    }
    <Route path='*' element={<NothingPage/>}/>
    </Routes>
  )
}

export default AppRoutes