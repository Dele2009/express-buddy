# Create Express Buddy

`create-express-buddy` is a CLI tool for generating a Node.js, Express project template.

> **Compatibility Note:**

> This package requires [Node.js](https://nodejs.org/en/) version 18+, 20+. However, some templates require a higher Node.js version to work, please upgrade if your package manager warns about it.


With NPM:
```bash

$ npm create express-buddy@latest

```


With Yarn:


```bash

$ yarn create express-buddy

```


With PNPM:


```bash

$ pnpm create express-buddy

```


With Bun:


```bash

$ bun create express-buddy

```


Then follow the prompts!


You can also directly specify the project name you want to use via additional command line options. For example, to scaffold a new express-buddy project, run:


```bash
npm create express-buddy@latest <app-name>
```


### Example

```bash
npm create express-buddy@latest my-express-app
```

This will create a new directory called `my-express-app` with the project template for the express app.

## Getting Started

After creating the project, navigate to the project directory and initialize it:

```bash
cd my-express-app
npm run init
npm run dev
```

## License

This project is licensed under the MIT License.