# Master Gatsby

Based on a Premium JavaScript + CSS Training Course from Wes Bos. You can grab the course at [MasterGatsby.com](https://mastergatsby.com).

## Notes

1. Gatsby by default uses `module.exports = {` commonJS syntax node typically in the gatsby documentation and we want to use ES6 modules `export default {`. So that we can use es modules this project we use a package called esm. - to enable within the `package.json` we can add `NODE_OPTIONS="-r esm"` in front of `gatsby build`. The cross-env package is there for windows users.
