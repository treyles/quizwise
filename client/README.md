# React Starter

A personal React build system to get projects up and running quickly.
This was made in an effort to familiarize myself with modern JS build tools and manual configuration.

## Features

* [Webpack](https://github.com/webpack/webpack) - module bundler
* [Babel](https://github.com/babel/babel) - ES6 and JSX transpiler
* [ESLint](https://github.com/eslint/eslint) - Javascript validation, adhering to [Airbnb's style guide](https://github.com/airbnb/javascript)
* [PostCSS (with Autoprefixer)](https://github.com/postcss/postcss) - automates vendor prefixes
* [Prettier](https://github.com/prettier/prettier) - code formatter
* Sass support

## Getting Started

**Clone**

```bash
git clone https://github.com/treyles/react-starter.git
```

**Install**

```bash
yarn

# or

npm install
```

## Commands

Command|Description
------------------|-----------
`yarn build`|build for production
`yarn lint`|run ESLint
`yarn format`|run Prettier
`yarn dev`|run webpack dev server at [http://localhost:8080/](http://localhost:8080/)