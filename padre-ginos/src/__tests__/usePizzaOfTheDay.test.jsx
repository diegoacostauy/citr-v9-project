import { afterEach, expect, test, vi } from "vitest";
import { cleanup, render, renderHook, waitFor } from "@testing-library/react";
import createFetchMock from "vitest-fetch-mock";
import { usePizzaOfDay } from "../hooks/usePizzaOfDay";

const fetchMock = createFetchMock(vi);
fetchMock.enableMocks();

afterEach(cleanup);

const testPizza = {
  id: 'calabrese',
  name: 'The Calabrese Pizza',
  category: 'Supreme',
  description: 'Spicy salami, red chilies, mozzarella, tomato sauce, and fresh basil',
  image: '/public/pizzas/calabrese.webp',
  size: { S: 10, M: 12, L: 14 },
};

// fake use of usePizzaOfDay inside a fake component that return null;
// function getPizzaOfTheDay() {
//   let pizza = null;

//   function TestComponent() {
//     pizza = usePizzaOfDay();

//     return null;
//   }

//   render(<TestComponent />);

//   return pizza;
// }

test('return null when first called', async () => {
  fetchMock.mockResponseOnce(JSON.stringify(testPizza));
  // const pizza = getPizzaOfTheDay(); // fake use of usePizzaOfDay inside a fake component that return null;
  const { result } = renderHook(() => usePizzaOfDay());
  expect(result.current).toBeNull();
});

test('return pizza of the day after calling API', async () => {
  fetchMock.mockResponseOnce(JSON.stringify(testPizza));
  const { result } = renderHook(() => usePizzaOfDay());
  await waitFor(() => expect(result.current).toEqual(testPizza));

  expect(fetchMock).toHaveBeenCalledWith('/api/pizza-of-the-day');
});
