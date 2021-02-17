import React from 'react';
import LoadingGrid from '../components/LoadingGrid';
import SEO from '../components/SEO';
import { HomePageGrid } from '../styles/Grids';
import useLatestData from '../utils/useLatestData';

function CurrentlySlicing({ sliceMasters }) {
  return (
    <div>
      {!sliceMasters && <LoadingGrid count={4} />}
      {sliceMasters && !sliceMasters?.length && (
        <p>No one is slicing at present</p>
      )}
    </div>
  );
}
function HotSlices({ hotSlices }) {
  return (
    <div>
      {!hotSlices && <LoadingGrid count={4} />}
      {hotSlices && !hotSlices?.length && <p>No Slices available</p>}
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
      <HomePageGrid>
        <CurrentlySlicing sliceMasters={sliceMasters} />
        <HotSlices hotSlices={hotSlices} />
      </HomePageGrid>
    </div>
  );
}
