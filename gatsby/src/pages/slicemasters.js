import { graphql } from 'gatsby';
import React from 'react';
import SliceMasterList from '../components/SliceMasters';

export default function SlicemastersPage({ data }) {
  const slicemasters = data.slicemasters.nodes;
  return (
    <>
      <p>Slicemasters page</p>
      <p>Showing {process.env.GATSBY_PAGE_SIZE} Slicemasters per page!</p>
      <SliceMasterList slicemasters={slicemasters} />
    </>
  );
}

export const query = graphql`
  query SliceMastersQuery($skip: Int = 0, $pageSize: Int = 2) {
    slicemasters: allSanityPerson(limit: $pageSize, skip: $skip) {
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
