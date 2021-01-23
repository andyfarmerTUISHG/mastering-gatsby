import { useContext } from 'react';
import OrderContext from '../components/OrderContext';

export default function usePizza({ pizzas, inputs }) {
  // 1, Create Ste to hold our order

  // MG-38 - this line is not required as useState moved up to the Provider - OrderContext.js
  // const [order, setOrder] = useState([]);

  // MG-38 - Now we access state and update function setOrder via context
  const [order, setOrder] = useContext(OrderContext);

  // 2. Make a function to add things to order
  function addToOrder(orderedPizza) {
    setOrder([...order, orderedPizza]);
  }
  // 3. Make a function to remove things from order
  function removeFromOrder(index) {
    setOrder([
      // everything before the item we want to remove
      ...order.slice(0, index),
      // everything after the item we want to remove
      // Slice with no seconds argument defaults to the end
      ...order.slice(index + 1),
    ]);
  }
  // 4. Send this data to a serverless function when they checkout
  // TODO
  return {
    order,
    addToOrder,
    removeFromOrder,
  };
}
