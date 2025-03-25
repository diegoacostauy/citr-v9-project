import {createRootRoute, Outlet} from "@tanstack/react-router"
import { PizzaOfDay } from "../PizzaOfDay";
import { Header } from "../Header";
import { CartProvider } from "../context/CartContext";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export const Route = createRootRoute({
  component: () => {
    return (
      <>
        <CartProvider>
          <div>
            <Header />
            <Outlet />
            <PizzaOfDay />
          </div>
        </CartProvider>
        <TanStackRouterDevtools />
        <ReactQueryDevtools />
      </>
    )
  }
});
