import React from 'react';
import Img from 'gatsby-image';
import MenuStyles from '../styles/MenuStyles';
import formatMoney from '../utils/formatMoney';
import calculatePizzaPrice from '../utils/calculatePizzaPrice';

export default function PizzaOrder({ order, pizzas, removeFromOrder }) {
  return (
    <>
      <p>
        You have a {order.length} pizza{order.length > 1 ? 's' : null} in your
        order
      </p>
      {order.map((singleOrder, index) => {
        const pizza = pizzas.find((p) => singleOrder.id === p.id);
        return (
          <MenuStyles key={index}>
            <Img
              width="50"
              height="50"
              fluid={pizza.image.asset.fluid}
              alt={pizza.name}
            />
            <h2>
              {pizza.name} ({singleOrder.size})
            </h2>
            <p>
              Price -
              {formatMoney(calculatePizzaPrice(pizza.price, singleOrder.size))}
              <button
                type="button"
                className="remove"
                title={`Remove ${singleOrder.size} ${pizza.name} from order`}
                // onClick={removeFromOrder(index)}
                onClick={() => removeFromOrder(index)}
              >
                &times;
              </button>
            </p>
          </MenuStyles>
        );
      })}
    </>
  );
}
