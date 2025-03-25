import { createLazyFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { useQuery } from "@tanstack/react-query";
import { getPastOrders, getPastOrder } from '../services/api';
import { Modal } from '../Modal';
import { formatPrice } from '../utils/price';
import ErrorBoundary from '../ErrorBoundary';

export const Route = createLazyFileRoute('/past-orders')({
  component: PastOrdersWithErrorBoundary,
});

function PastOrdersWithErrorBoundary() {
  return (
    <ErrorBoundary>
      <PastOrders />
    </ErrorBoundary>
  )
}

function PastOrders() {
  const [page, setPage] = useState(1);
  const [focusOrder, setFocusOrder] = useState(null);

  const { isLoading, data } = useQuery({
    queryKey: ['past-orders', page],
    queryFn: () => getPastOrders(page),
    staleTime: 30000,
  });

  const { isLoading: isLoadingOrder, data: orderData } = useQuery({
    queryKey: ['past-order', focusOrder],
    queryFn: () => getPastOrder(focusOrder),
    enabled: !!focusOrder,
    staleTime: 24 * 60 * 60 * 1000
  });


  return (
      isLoading ? (
        <div className="past-orders">
          <h2>LOADING...</h2>
        </div>
    ) :
      (
        <div className="past-orders">
          <table>
            <thead>
              <tr>
                <th>
                  Order ID
                </th>
                <th>
                  Date
                </th>
                <th>
                  Time
                </th>
              </tr>
            </thead>
            <tbody>
              {
                data.map(order => (
                  <tr key={order.order_id}>
                    <td>
                      <button onClick={() => setFocusOrder(order.order_id)}>
                        {order.order_id}
                      </button>
                    </td>
                    <td>
                      {order.date}
                    </td>
                    <td>
                      {order.time}
                    </td>
                  </tr>
                ))
              }
          </tbody>
          </table>
          <div className="pages">
            <button disabled={page<= 1} onClick={() => setPage(page - 1)}>Previous</button>
            <button disabled={data.length < 10} onClick={() => setPage(page + 1)}>Next</button>
          </div>
          {
            focusOrder && (
              <Modal
                show={!!focusOrder}
                onHide={() => setFocusOrder(null)}
              >
                <h2>Order #({focusOrder})</h2>
                {
                  isLoadingOrder ? (
                    <p>Loading...</p>
                  ) : (
                    <table>
                      <thead>
                          <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Size</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Total</th>
                          </tr>
                      </thead>
                      <tbody>
                        {
                          orderData.orderItems.map(pizza => (
                            <tr key={`${pizza.pizzaTypeId}_${pizza.size}`}>
                              <td>
                                <img src={pizza.image} alt={pizza.name} />
                              </td>
                              <td>
                                {pizza.name}
                              </td>
                              <td>
                                {pizza.size}
                              </td>
                              <td>
                                {pizza.quantity}
                              </td>
                              <td>
                                {formatPrice(pizza.price)}
                              </td>
                              <td>
                                {formatPrice(pizza.total)}
                              </td>
                            </tr>
                          ))
                        }
                      </tbody>
                    </table>
                  )
                }
              </Modal>
            )
          }
        </div>
      )
  )
}
