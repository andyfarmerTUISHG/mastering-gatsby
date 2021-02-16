import React from 'react';
import SEO from '../components/SEO';
import useLatestData from '../utils/useLatestData';

function CurrentlySlicing() {
  return (
    <div>
      <h3>Currently Slicing</h3>Custom Component
    </div>
  );
}
function HotSlices() {
  return (
    <div>
      <h3>Pizzas by the Slice</h3>Custom Component
    </div>
  );
}
export default function HomePage() {
  const { sliceMasters, hotSlices } = useLatestData();

  return (
    <div className="center">
      <SEO title="Sick's Slices - The Best Pizzas" />
      <h2>The Best Pizza Downtown!</h2>
      <p>Open 11am to 11pm Every Single Day</p>
      <div>
        <CurrentlySlicing sliceMasters={sliceMasters} />
        <HotSlices hotSlices={hotSlices} />
      </div>
    </div>
  );
}
