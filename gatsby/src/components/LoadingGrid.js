import React from 'react';
import { ItemsGrid, ItemStyle } from '../styles/Grids';

function LoadingGrid({ count }) {
  return (
    <ItemsGrid>
      {Array.from({ length: count }, (_, i) => (
        <ItemStyle key={Math.random() + i}>
          <p>
            <span className="mark">Loading...</span>
          </p>
          {/* Image Generated from PNG-PIXEL.com */}
          <img
            src="data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAAUAAAAECAQAAADsOj3LAAAADklEQVR42mNkgANGQkwAAJoABWH6GPAAAAAASUVORK5CYII="
            alt="loading"
            className="loading"
            srcSet=""
            width="500"
            height="400"
          />
        </ItemStyle>
      ))}
    </ItemsGrid>
  );
}

export default LoadingGrid;
