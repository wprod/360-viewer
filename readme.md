# 220 Viewer

This project uses [React-Fiber](https://github.com/react-spring/react-three-fiber), A react renderer for threejs (web
and react-native).

## 🚀 Quick start

```
yarn
yarn start
```

## Build and serve

- `yarn build` - build the site statically for production in the `public` folder.

## Environment and deployment

This project is deployed via Netlify [here](https://compassionate-ramanujan-4c4a03.netlify.com/).

## Code quality

- `yarn lint:js` - lint JavaScript files with [ESLint](https://eslint.org/).
- `yarn lint:pretty` - check that all files respect [Prettier](https://prettier.io/) formatting.

Additional commands for fixing and debugging:

- `yarn lint` - run all the commands above in parallel.
- `yarn lint:pretty --write` - format all files with Prettier.

Your code editor should be configured to fix ESLint and stylelint errors and format files with Prettier on save. Make
sure to install the recommended extensions in VSCode and the recommended plugins in IntelliJ.
