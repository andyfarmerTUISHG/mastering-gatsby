import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';
import SEO from '../components/SEO';

const SlicemasterStyles = styled.div`
  a {
    text-decoration: none;
  }
  .gatsby-image-wrapper {
    height: 400px;
  }
  h3 {
    text-align: center;
    font-size: 3rem;
  }
  .description {
    text-align: center;
  }
`;

export default function SliceMasterPage({ data: { slicemaster } }) {
  // Destructure 2 levels down { data: { slicemaster } }

  return (
    <SlicemasterStyles>
      <SEO
        title={slicemaster.name}
        image={slicemaster.image?.asset?.fluid?.src}
      />
      <Img fluid={slicemaster.image.asset.fluid} alt={slicemaster.name} />
      <h3>
        <span className="mark">{slicemaster.name}</span>
      </h3>
      <p className="description">{slicemaster.description}</p>
    </SlicemasterStyles>
  );
}

// This needs to be dynamic based on the slug passed in via context in gatsby-node.js
// graphql queries need to be typed - cant just tell the parameters coming in
export const query = graphql`
  query($slug: String!) {
    slicemaster: sanityPerson(slug: { current: { eq: $slug } }) {
      id
      name
      slug {
        current
      }
      description
      image {
        asset {
          fluid(maxWidth: 1000, maxHeight: 750) {
            ...GatsbySanityImageFluid
          }
        }
      }
    }
  }
`;
