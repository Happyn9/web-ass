import React from 'react'
import { Route,Routes } from 'react-router-dom'
import Home from './Pages/Home';
import Dashboard from './Pages/Dashboard';
import Transactions from './Pages/Transactions';

import History from './Pages/History';
import NotFound from './Pages/NotFound';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/dashboard' element={<Dashboard />}></Route>
        <Route path='/' element ={<Home />}></Route>
        <Route path='/history' element={<History />}></Route>
        <Route path='/transactions' element={<Transactions />}></Route>
        <Route path='*' element={<NotFound />}></Route>
      </Routes>
    </div>
  )
}

export default App