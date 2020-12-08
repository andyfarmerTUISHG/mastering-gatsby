const path = require(`path`);

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

exports.createPages = async (params) => {
  // Create Pages Dynamically
  console.log(`_________________________________________`);
  console.log(`____ Building Pages                   ___`);
  console.log(`_________________________________________`);
  // 1. Pizzas,
  await turnPizzasIntoPages(params);
  // 2. Toppings
  // 3. Slicemasters
};
