import { formatPrice } from "./utils/price";

export const Cart = ({ cart, checkout }) => {
  let total = cart.reduce((sum, item) => sum + item.pizza.sizes[item.size], 0);

  return (
    <div className="cart">
      <h2>Cart</h2>
      <ul>
        {
          cart.map((item, idx) => (
            <li key={idx}>
              <span className="size">{item.size}</span> -
              <span className="type">{item.pizza.name}</span> -
              <span className="price">{item.pizza.sizes[item.size]}</span>
            </li>
          ))
        }
      </ul>
      <p className="total">Total: {formatPrice(total)}</p>
      <button onClick={checkout}>Checkout</button>
    </div>
  );
}
