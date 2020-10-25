import { Link } from 'gatsby';
import Img from 'gatsby-image';
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
      <Img fluid={pizza.image.asset.fluid} alt={pizza.name} />
      {/* <Img fixed={pizza.image.asset.fixed} alt={pizza.name} /> */}
    </div>
  );
}
