import { useDebugValue, useEffect, useState } from "react";

export const usePizzaOfDay = () => {
  const [pizzaOfDay, setPizzaOfDay] = useState(null);
  useDebugValue(pizzaOfDay ? `Pizza of the day: ${pizzaOfDay.name}` : "Loading pizza of the day");

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/pizza-of-the-day");
      const data = await res.json();
      setPizzaOfDay(data);
    })();
  }, []);

  return pizzaOfDay;
}
