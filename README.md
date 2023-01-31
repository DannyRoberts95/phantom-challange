## Features

- Next.js 13
- Global hosting on Vercel
- React 18
- TypeScript
- ESLint — To find and fix problems in your code
- Prettier — Code Formatter for consistent style
- Husky — For running scripts before committing
- lint-staged — Run ESLint and Prettier against staged Git files
- Path Mapping — Import components or images using the `@` prefix

### Development

To start the project locally, run:

```bash
npm dev
```

Open `http://localhost:3000` with your browser to see the result.

## Documentation

Open `https://phantom-challange.vercel.app/` with your browser to see the result.

### Requirements

- Node.js >= 12.22.0

### Directory Structure

- [`.github`](.github) — GitHub configuration including the CI workflow.<br>
- [`.husky`](.husky) — Husky configuration and hooks.<br>
- [`public`](./public) — Static assets such as robots.txt, images, and favicon.<br>
- [`src`](./src) — Application source code, including pages, components, styles.

### Scripts

- `npm dev` — Starts the application in development mode at `http://localhost:3000`.
- `npm build` — Creates an optimized production build of your application.
- `npm start` — Starts the application in production mode.
- `npm lint` — Runs ESLint for all files in the `src` directory.
- `npm format` — Runs Prettier for all files in the `src` directory.
