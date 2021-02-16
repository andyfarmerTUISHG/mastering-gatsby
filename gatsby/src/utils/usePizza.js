import { useContext, useState } from 'react';
import OrderContext from '../components/OrderContext';
import attachNamesAndPrices from './attachNamesAndPrices';
import calculateOrderTotal from './calculateOrderTotal';

export default function usePizza({ pizzas, values }) {
  // 1, Create State to hold our order

  // MG-38 - this line is not required as useState moved up to the Provider - OrderContext.js
  // const [order, setOrder] = useState([]);

  // MG-38 - Now we access state and update function setOrder via context
  const [order, setOrder] = useContext(OrderContext);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

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

  // Function that is run when someone submits the form
  async function submitOrder(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);
    // gather data to be sent
    // console.log(`values - ${JSON.stringify(values)}`);
    const body = {
      order: attachNamesAndPrices(order, pizzas),
      total: calculateOrderTotal(order, pizzas),
      name: values.name,
      email: values.email,
      mapleSyrup: values.mapleSyrup,
    };

    // 4. Send this data to a serverless function when they checkout
    const res = await fetch(
      `${process.env.GATSBY_SERVERLESS_BASE}/placeOrder`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }
    );
    const text = JSON.parse(await res.text());
    // check if everything worked
    if (res.status >= 400 && res.status < 600) {
      setLoading(false); // turn off loading
      setError(text.message);
    } else {
      // it worked!
      setLoading(false);
      setMessage(`come get your pizza`);
    }
  }
  return {
    order,
    addToOrder,
    removeFromOrder,
    submitOrder,
    error,
    loading,
    message,
  };
}
