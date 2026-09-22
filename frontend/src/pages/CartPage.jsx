import { Link } from 'react-router-dom'

function CartPage() {
  return (
    <>
      <h2>Cart</h2>
      <Link to="/checkout">Proceed to Checkout</Link>
    </>
  )
}

export default CartPage