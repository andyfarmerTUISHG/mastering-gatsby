import { useState, useEffect } from 'react';

export default function useLatestData() {
  // hot slices
  const [hotSlices, setHotSlices] = useState();
  // slicemaster
  const [sliceMasters, setSliceMasters] = useState();

  // Use a side effect to fetch the data from the graphql endpoint
  useEffect(() => {
    // When the component loads, fetch the data
    fetch(process.env.GATSBY_GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
        query {
          StoreSettings(id: "downtown"){
            slicemaster{
              name
            }
            hotSlices{
              name
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
      });
  }, []);

  return {
    hotSlices,
    sliceMasters,
  };
}
