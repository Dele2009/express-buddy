# Create Express Buddy

`create-express-buddy` is a CLI tool for generating a Node.js, Express project template.

> **Compatibility Note:**

> Vite requires [Node.js](https://nodejs.org/en/) version 18+, 20+. However, some templates require a higher Node.js version to work, please upgrade if your package manager warns about it.


With NPM:
```bash

$ npm create vite@latest

```


With Yarn:


```bash

$ yarn create vite

```


With PNPM:


```bash

$ pnpm create vite

```


With Bun:


```bash

$ bun create vite

```


Then follow the prompts!


You can also directly specify the project name and the template you want to use via additional command line options. For example, to scaffold a Vite + Vue project, run:


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