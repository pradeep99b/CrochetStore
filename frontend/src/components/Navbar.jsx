import { NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <nav>
      <h1>Crochet Store</h1>

      <div>
        <NavLink to="/">Home</NavLink>
        {' | '}
        <NavLink to="/shop">Shop</NavLink>
        {' | '}
        <NavLink to="/cart">Cart</NavLink>
      </div>
    </nav>
  )
}

export default Navbar