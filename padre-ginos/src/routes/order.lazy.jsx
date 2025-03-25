import { useEffect, useState } from 'react';
import { Pizza } from '../Pizza';
import { formatPrice } from '../utils/price';
import { Cart } from '../Cart';
import { useCart } from '../context/CartContext';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/order')({
  component: Order,
});

function Order() {
  const [pizzaTypes, setPizzaTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pizzaType, setPizzaType] = useState('pepperoni');
  const [pizzaSize, setPizzaSize] = useState('M');
  const [cart, setCart] = useCart();

  let price, selectedPizza;

  if (!loading) {
    selectedPizza = pizzaTypes.find((pizza) => pizza.id === pizzaType);
    price = formatPrice(selectedPizza?.sizes[pizzaSize]);
  }

  const fetchPizzas = async () => {
    const res = await fetch('/api/pizzas');
    const data = await res.json();
    setPizzaTypes(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchPizzas();
  }, []);

  const handleSizeChange = (e) => setPizzaSize(e.target.value);

  const checkout = async () => {
    setLoading(true);

    await fetch('/api/order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cart }),
    });

    setLoading(false);
    setCart([]);
  }

  return (
    <div className="order-page">
      <div className="order">
        <h2>Create order</h2>
        <form action="" onSubmit={(e) => {
          e.preventDefault();
          setCart([...cart, { pizza: selectedPizza, size: pizzaSize }]);
        }}>
          <div>
            <div>
              <label htmlFor="pizza-type">Pizza Type</label>
              <select name="pizza-type" id="" value={pizzaType} onChange={(e) => setPizzaType(e.target.value)}>
                {
                  pizzaTypes.map((pizza) => (
                    <option key={pizza.id} value={pizza.id}>{pizza.name}</option>
                  ))
                }
              </select>
            </div>
            <div>
              <label htmlFor="pizza-size">Pizza Size</label>
              <span>
                <input onChange={handleSizeChange} type="radio" name="pizza-size" id="pizza-s" value="S" checked={pizzaSize === 'S'} />
                <label htmlFor="pizza-s">Small</label>
              </span>
              <span>
                <input onChange={handleSizeChange} type="radio" name="pizza-size" id="pizza-m" value="M" checked={pizzaSize === 'M'} />
                <label htmlFor="pizza-m">Medium</label>
              </span>
              <span>
                <input onChange={handleSizeChange} type="radio" name="pizza-size" id="pizza-l" value="L" checked={pizzaSize === 'L'} />
                <label htmlFor="pizza-l">Large</label>
              </span>
            </div>
            <button type="submit">Add to cart</button>
          </div>
          {
            selectedPizza && (
              <div className="order-pizza">
                <Pizza
                  name={selectedPizza.name}
                  description={selectedPizza.description}
                  img={selectedPizza.image}
                />
                <p>
                  <strong>Price:</strong> {price}
                </p>
              </div>
            )
          }
        </form>
      </div>
      {
        loading ? <h2>Loading...</h2> : <Cart cart={cart} checkout={checkout} />
      }
    </div>
  )
}
