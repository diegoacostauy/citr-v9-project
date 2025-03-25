import { usePizzaOfDay } from "./hooks/usePizzaOfDay";
import { formatPrice } from "./utils/price";

export const PizzaOfDay = () => {

  const pizzaOfDay = usePizzaOfDay();

  if (!pizzaOfDay) {
    return <div className="">Loading...</div>;
  }

  return (
    <div className="pizza-of-the-day">
      <h2>Pizza of the day</h2>
      <div>
        <div className="pizza-of-the-day-info">
          <h3>{pizzaOfDay.name}</h3>
          <p>{pizzaOfDay.description}</p>
          <p className="pizza-of-the-day-price">
            From: {formatPrice(pizzaOfDay.sizes.S)}
          </p>
        </div>
        <img src={pizzaOfDay.image} alt={pizzaOfDay.name} className="pizza-of-the-day-image" />
      </div>
    </div>
  );
}
