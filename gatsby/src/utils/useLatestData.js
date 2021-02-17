import { useState, useEffect } from 'react';

export default function useLatestData() {
  // Fake out VS Code for code formating
  const gql = String.raw;
  // hot slices
  const [hotSlices, setHotSlices] = useState();
  // slicemaster
  const [sliceMasters, setSliceMasters] = useState();

  const deets = `
              name
                slug {
                  current
                }
              image {
                asset {
                  url
                  metadata {
                    lqip
                  }
                }
              }`;
  // Use a side effect to fetch the data from the graphql endpoint
  useEffect(() => {
    // When the component loads, fetch the data
    fetch(process.env.GATSBY_GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: gql`
          query {
            StoreSettings(id: "downtown") {
              slicemaster {
                
                ${deets}
              }
              hotSlices {
                
                ${deets}
              }
            }
          }
        `,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        // TODO: check for errors
        // TODO: set the data to state
        setHotSlices(res.data.StoreSettings.hotSlices);
        setSliceMasters(res.data.StoreSettings.slicemaster);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return {
    hotSlices,
    sliceMasters,
  };
}
