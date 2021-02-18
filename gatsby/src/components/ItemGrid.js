import React from 'react';
import { ItemsGrid, ItemStyle } from '../styles/Grids';

function ItemGrid({ items }) {
  return (
    <ItemsGrid>
      {items.map((item, index) => (
        <ItemStyle key={`${item.name.replace(' ', '')}-${index}`}>
          <p>
            <span className="mark">{item.name}</span>
          </p>
          <img
            src={`${item.image.asset.url}?w=500&h=400&fit=crop`}
            // src=""
            alt={item.name}
            width="500"
            height="400"
            style={{
              background: `url(${item.image.asset.metadata.lqip})`,
              backgroundSize: 'cover',
            }}
          />
        </ItemStyle>
      ))}
    </ItemsGrid>
  );
}

export default ItemGrid;
