import fetch from 'isomorphic-fetch';

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
  console.log(`____ 🏗️ - 🍕 Building Pizzas           ___`);
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
  console.log(`____ 🏗️ - 🌶️  Building Toppings         ___`);
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

async function fetchBeersAndTurnIntoNodes({
  actions,
  createNodeId,
  createContentDigest,
}) {
  console.log(`_________________________________________`);
  console.log(`____ 🏗️ - 🍻 Turn Beers into Nodes     ___`);
  // 1. Fetch a list of beers
  const res = await fetch(`https://sampleapis.com/beers/api/ale`);
  const beers = await res.json();
  // 2. Loop over each one
  beers.forEach((beer) => {
    // create node for each beer
    const nodeMeta = {
      id: createNodeId(`beer-${beer.name}`),
      parent: null,
      children: [],
      internal: {
        type: 'Beer',
        mediaType: 'application/json',
        contentDigest: createContentDigest(beer),
      },
    };
    // 3, Create a node for each Beer
    actions.createNode({
      ...beer,
      ...nodeMeta,
    });
  });
}

async function turnSliceMastersIntoPages({ graphql, actions }) {
  console.log(`_________________________________________`);
  console.log(`____ 🏗️ - 💁  Building Slicemasters    ___`);
  console.log(`_________________________________________`);

  // 1. Query all slicematers
  const {
    data: { slicemasters },
  } = await graphql(`
    query {
      slicemasters: allSanityPerson {
        totalCount
        nodes {
          id
          name
          slug {
            current
          }
          description
        }
      }
    }
  `);
  // 2. turn each slicemaster into their own page
  const { createPage } = actions;
  const sliceMasterTemplate = path.resolve(`./src/pages/slicemasters.js`);
  slicemasters.nodes.forEach((slicemaster) => {
    createPage({
      path: `slicemaster/${slicemaster.slug.current}`,
      component: sliceMasterTemplate,
      context: {
        slug: slicemaster.slug.current,
      },
    });
  });
  // 3. Figure out how many pages based on number of Slicemasters, and how manage pages
  const pageSize = parseInt(process.env.GATSBY_PAGE_SIZE);
  const pageCount = Math.ceil(slicemasters.totalCount / pageSize);
  console.log(
    `There are ${slicemasters.totalCount} people and there should be ${pageSize} per page\n total number of pages required ${pageCount}`
  );
  // 4. Loop from 1 to n - and create pages for them
  Array.from({ length: pageCount }).forEach((_, i) => {
    console.log(`Creating page ${i}`);
    actions.createPage({
      path: `slicemasters/${i + 1}`,
      component: sliceMasterTemplate,
      context: {
        pagination: i + 1,
        skip: i * pageSize,
        currentPage: i + 1,
        pageSize,
      },
    });
  });
}

export async function sourceNodes(params) {
  // fetch list of beers and source them into our Gatsby API
  // Sourcing - getting data in the Gatsby API
  // Nodes are pieces of data (Beer in this case)
  await Promise.all([fetchBeersAndTurnIntoNodes(params)]);
}

exports.createPages = async (params) => {
  // Create Pages Dynamically
  console.log(`_________________________________________`);
  console.log(`____ 🏗️ - 📄 Building Pages            ___`);
  // Wait for all promises to be resolved before finishing this function
  // 1. Pizzas,
  // 2. Toppings
  await Promise.all([
    turnPizzasIntoPages(params),
    turnToppingsIntoPages(params),
    turnSliceMastersIntoPages(params),
  ]);

  // 3. Slicemasters
};
