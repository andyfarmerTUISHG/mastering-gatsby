import React from 'react';
import { Link } from 'gatsby';

export default function Nav() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Hot Now</Link>
        </li>
        <li>
          <Link to="/pizzas">Pizza Menu</Link>
        </li>
        <li>
          <Link to="/">Slick's Slices</Link>
        </li>
        <li>
          <Link to="/slicemasters">SliceMaster</Link>
        </li>
        <li>
          <Link to="/orders">Order Ahead!</Link>
        </li>
      </ul>
    </nav>
  );
}
