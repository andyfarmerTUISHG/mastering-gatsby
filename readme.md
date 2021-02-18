# Master Gatsby

[![Netlify Status](https://api.netlify.com/api/v1/badges/28e6e33a-d2f6-45b8-8dec-69a1b2abb51c/deploy-status)](https://app.netlify.com/sites/slickslices-andyfarmer/deploys)

Based on a Premium JavaScript + CSS Training Course from Wes Bos. You can grab the course at [MasterGatsby.com](https://mastergatsby.com).

## Notes

1. Gatsby by default uses `module.exports = {` commonJS syntax node typically in the gatsby documentation and we want to use ES6 modules `export default {`. So that we can use es modules this project we use a package called esm. - to enable within the `package.json` we can add `NODE_OPTIONS="-r esm"` in front of `gatsby build`. The cross-env package is there for windows users.
1. Page Queries (ie Dynamic) / Static Queries - Query outside of a page - ie ina function queries that do not take variables (gatsby limitation)
1. To expose environments variable to the front end of your gatsby build they need to be prefixed with `GATSBY_`
1. Nested chaining example to check for Items - `{pizza.image?.asset?.fluid?.src}` example in `gatsby/src/templates/Pizza.js`

## Running the Project

1. Check out the project
1. From within `gatsby` run `npm run start`
1. from within `sanity` run `npm run start`
