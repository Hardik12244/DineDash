import React from 'react'
import Navbar from './components/navbar/Navbar'
import Sidebar from './components/sidebar/Sidebar'
import { Route, Routes } from 'react-router-dom'
import Add from '../src/Add/Add' 
import Orders from './Orders/Orders'
import List from './List/List'
const App = () => {
  return (
    <div>
        <Navbar/>
        <hr />
        <div className="app-content">
              <Sidebar/>
    <Routes>
      <Route path='/add' element={<Add/>}/>
      <Route path='/orders' element={<Orders/>}/>
      <Route path='/list' element={<List/>}/>
    </Routes>
        </div>
      </div>
  )
}

export default App