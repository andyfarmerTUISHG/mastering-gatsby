import { graphql } from 'gatsby';
import React from 'react';
import SliceMasterList from '../components/SliceMasters';

export default function SlicemastersPage({ data }) {
  const slicemasters = data.slicemasters.nodes;
  return (
    <>
      <p>Slicemasters page</p>
      <SliceMasterList slicemasters={slicemasters} />
    </>
  );
}

export const query = graphql`
  query SliceMastersQuery {
    slicemasters: allSanityPerson {
      totalCount
      nodes {
        id
        name
        slug {
          current
        }
        description
        image {
          asset {
            fluid(maxWidth: 400) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;
