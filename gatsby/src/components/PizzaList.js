import { Link } from 'gatsby';
import React from 'react';

export default function PizzaList({ pizzas }) {
  console.log(pizzas.length);
  return (
    <>
      <p>There are {pizzas.length} pizzas</p>
      {pizzas.map((pizza) => (
        <SinglePizza key={pizza.id} pizza={pizza} />
      ))}
    </>
  );
}

function SinglePizza({ pizza }) {
  return (
    <div>
      <Link to={`/pizza/${pizza.slug.current}`}>
        <h2>
          <span className="mark">{pizza.name}</span>
        </h2>
      </Link>
      <p>{pizza.toppings.map((topping) => topping.name).join(', ')}</p>
    </div>
  );
}
