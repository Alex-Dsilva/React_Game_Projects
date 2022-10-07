import React from 'react'
import {Routes,Route} from "react-router-dom"
import Entername from './Entername'
import Board from '../tic_comp/Board'

const AllRoutes = () => {
  return (
    <div>
    <Routes>
         <Route path='/' element={<Board/>}/>
    </Routes> 
      
     </div>
  )
}

export default AllRoutes
