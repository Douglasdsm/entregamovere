import React from 'react'
import Header from './Header'
import MaiorVendas from'./MaiorVenda'

import {
  BrowserRouter as Router,
  Route 
}from 'react-router-dom'
import Vendas from './Vendas'



 
function App() {


   
  return (
    <Router>
      <div >
        <Header />
        <Route path='/' exact component={Vendas}/>
        <Route path='/venda' exact component={MaiorVendas}/>
        
        
      </div>
    </Router>
  )
}


export default App;
