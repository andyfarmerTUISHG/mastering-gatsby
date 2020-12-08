const path = require(`path`);

function countPizzasInToppings(pizzas) {
  // Return the pizzas with counts
  const counts = pizzas
    .map((pizza) => pizza.toppings)
    .flat()
    .reduce((acc, topping) => {
      // check if this is an existing topping
      const existingTopping = acc[topping.id];
      if (existingTopping) {
        // if it is increment by 1
        existingTopping.count += 1;
      } else {
        // otherwise create a new entry in our acc and set it to one
        acc[topping.id] = {
          id: topping.id,
          name: topping.name,
          count: 1,
        };
      }
      return acc;
    }, {});
  // sort them based on their count
  // AS its an object convert
  const sortedToppings = Object.values(counts).sort(
    (a, b) => b.count - a.count
  );
  return sortedToppings;
}

async function turnPizzasIntoPages({ graphql, actions }) {
  console.log(`_________________________________________`);
  console.log(`____ Building Pizzas                  ___`);
  console.log(`_________________________________________`);
  // 1.  Get a template for this page
  const { createPage } = actions;
  const pizzaTemplate = path.resolve(`./src/templates/Pizza.js`);
  // 2. Query All Pizzas
  const { data } = await graphql(`
    query {
      pizzas: allSanityPizza {
        nodes {
          name
          slug {
            current
          }
        }
      }
    }
  `);
  // 3. Loop over each pizza dn create a page for each pizza
  data.pizzas.nodes.forEach((pizza) => {
    console.log(`Creating a page for `, pizza.name);
    createPage({
      path: `pizza/${pizza.slug.current}`,
      component: pizzaTemplate,
      context: {
        slug: pizza.slug.current,
      },
    });
  });
}

async function turnToppingsIntoPages({ graphql, actions }) {
  console.log(`_________________________________________`);
  console.log(`____ Building Toppings                ___`);
  console.log(`_________________________________________`);
  // 1.  Get a template for this page
  const { createPage } = actions;
  const toppingTemplate = path.resolve(`./src/pages/pizzas.js`);
  // 2. Query All Toppings
  const {
    data: { pizzas },
  } = await graphql(`
    query {
      pizzas: allSanityPizza {
        nodes {
          id
          toppings {
            id
            name
            vegetarian
          }
        }
      }
    }
  `);

  const toppingsWithCounts = countPizzasInToppings(pizzas.nodes);
  // 3. Loop over each topping and create a page for each topping
  toppingsWithCounts.forEach((topping) => {
    console.log(`Creating a page for `, topping.name);
    createPage({
      path: `topping/${topping.name}`,
      component: toppingTemplate,
      context: {
        topping: topping.name,
        toppingRegex: `/${topping.name}/i`,
      },
    });
  });
}

exports.createPages = async (params) => {
  // Create Pages Dynamically
  console.log(`_________________________________________`);
  console.log(`____ Building Pages                   ___`);
  console.log(`_________________________________________`);
  // Waot for all promises to be resolived before finishing this function
  // 1. Pizzas,
  // 2. Toppings
  await Promise.all([
    turnPizzasIntoPages(params),
    turnToppingsIntoPages(params),
  ]);

  // 3. Slicemasters
};
