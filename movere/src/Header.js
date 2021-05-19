import  React, {useState} from 'react'
import {Link} from 'react-router-dom'
import {
    Navbar,
    NavbarBrand,
    Collapse,
    Nav,
    NavItem,
    NavLink,
    NavbarToggler
  }from 'reactstrap'


const Header=()=>{
    const [open,setOpen] = useState(false)
    const toggle = ()=>{
      setOpen(!open)
   }
   return (
    <div>
      <Navbar color='light' light expand = 'md'>  
        <div className='container'>
          <NavbarBrand tag={Link} to='/'>Vendas</NavbarBrand>
            <NavbarToggler onClick={toggle}/>
            <Collapse isOpen={open} navbar>
              <Nav className='ml-auto' navbar>
                <NavItem>
                  <NavLink tag = {Link} to='/venda'>Maior Venda</NavLink>
                </NavItem>
              </Nav>
            </Collapse>
       </div>
      </Navbar>
    </div>
  
   )
  }
  export default Header