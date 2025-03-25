import { Link } from "@tanstack/react-router";
import { useCart } from "./context/CartContext"

export const Header = () => {
  const [cart] = useCart();

  return (
    <nav>
      <Link to={"/"}>
        <h1 className="logo">Padres Gino's Pizza</h1>
      </Link>
      <div className="nav-cart">
        🛒<div className="nav-cart-number">{cart.length}</div>
      </div>
    </nav>
  )
}
