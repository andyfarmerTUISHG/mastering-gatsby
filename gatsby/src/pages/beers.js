import React from 'react';
import { graphql } from 'gatsby';
import BeerList from '../components/BeerList';
import SEO from '../components/SEO';

export default function BeersPage({ data }) {
  console.log(data);
  const beers = data.beers.nodes;
  return (
    <>
      <SEO title={`Our Beer List We have ${beers.length} options`} />
      <h2 className="center">We have {beers.length}!!! Dine in Only</h2>
      <BeerList beers={beers} />
    </>
  );
}

export const query = graphql`
  query BeerQuery {
    beers: allBeer {
      nodes {
        id
        name
        image
        price
        rating {
          average
          reviews
        }
      }
    }
  }
`;
