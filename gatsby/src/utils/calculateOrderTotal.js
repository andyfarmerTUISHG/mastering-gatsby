import formatMoney from './formatMoney';
import calculatePizzaPrice from './calculatePizzaPrice';

export default function calculateOrderTotal(order, pizzas) {
  let orderTotal = 0;
  order.map((singleOrder) => {
    const pizza = pizzas.find((p) => singleOrder.id === p.id);

    return (orderTotal += calculatePizzaPrice(pizza.price, singleOrder.size));
  });

  return formatMoney(orderTotal);
}
