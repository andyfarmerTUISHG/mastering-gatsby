import React, { useState } from 'react';

/* MG-38 - Moving our Order State to React Context with a custom Provider
  Without react context when we navigate away from the Order page we loose the order,
  This is because Gatsby will mount and unmount and remount it - so state is lost
  To maintain state across pages - you have to put at the highest level.
  - we will need to use the wrap root element hook in Gatsby
  - we will need to move the state from Order.js and move into Context
  - Context allows us to store data and functionality at a high level and access a lower level with out passing props
*/
// create a order context
const OrderContext = React.createContext();

// create a provider - this is a component that live at a higheer level and we inject around our route.
export function OrderProvider({ children }) {
  // we need to stick state here (same as our usePizza hook)
  const [order, setOrder] = useState([]);

  // Return OrderContext.Provider with the Children
  // Make sure pass the value prop to the provider
  return (
    <OrderContext.Provider value={[order, setOrder]}>
      {children}
    </OrderContext.Provider>
  );
}

export default OrderContext;
