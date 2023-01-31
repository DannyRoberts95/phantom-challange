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

the application is built using typescript, React.js, and plain css (to my shigrin) as per the technical brief.
The app is deployed using vercel and scores a 100 across all Lighhouse metrics.

The app uses localStorage on the client browser to store and persist links saved by the user.
On inital mounting the app checks local storage for any exsiting data and populates a state variable in \_app.js. This data is then passed
down to the app page Component, giving all pages access to the data and the ability to update the data. The alternative option was to implement a react context to pass data to pages and childen, but given the simplicty of the app, I chose to pass props instead.

The user must enter a url using the form. This form takes user input for the link and its categories, validates it, and then updates the localstorage with the new data. I added a "Fake Link" button so that a user can quickly add many links for the sake of viewing the analytics page.

Since the brief stated the input must be a valid URL, The link is expected to conform to the anatomy of a URL, and include a protocol.
`https://developer.mozilla.org/en-US/docs/Learn/Common_questions/What_is_a_URL#basics_anatomy_of_a_url`

The user can then add categories to the link to organise and analyse their store.

## Does it exist? I don't know.

The attempts to validate whether or not the page hosted at the URL actually exists produced inconsistent results and has been disabled in the live app. A few different approaches were attempted to validate the existance on entry.

# XMLHTTPRequest

```ts
const urlExists = (url) => {
  var http = new XMLHttpRequest();
  http.open('HEAD', url, false);
  http.send();
  if (http.status == 200) return true;
  else return false;
};
```

This approach checks for a valid response from the URL via a XMLHttpRequest. However this approach did not work due to CORs issues around the requested resource & the client.

# IsReachable Package

```ts
const exists = await isReachable(url).then((valid) => {
  return valid;
});
```

This approach uses a package called isReachable to check if the Url provided is reachable. On the client side this relies on the site having a `public/favicon.ico`. This dependance on /favicon.ico proved to be inconsistant.

# IsReachable Nodejs Implementation

```ts
// Serverside
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const { url } = JSON.parse(req.body);
  await isReachable(url).then((valid) => {
    res.status(200).json({ valid });
  });

  //Client side
  const isReachable = await fetch(`api/checkUrl`, {
    method: `POST`,
    body: JSON.stringify({ url: linkInputValue }),
  }).then(async (res) => {
    const { valid } = await res.json();
    return valid;
  });
  if (!isReachable) {
    displayErrorMessage(`That URL dosn't exist bro...`);
    return false;
  }
}
```

This approach uses isReachable to check if the Url provided is reachable from the server side. This approach worked in development but proved to be inconsistent when deployed to vercel.

# Links List

Once the link in considered a valid URL, it is added to the localstorage and appears in the list and analytics page.
The existing categories appear above the lista nd allow a user to filter the results for less faffing when looking for a link.
The links are paginated into blocks of 20.
Links can be cleared individually from the list or in bulk from the form.

# Analytics

The user can view visualisations of thier store from the links page. This was a shot at seeing how one could add a little visual spice to the otherwise tabular link list. These animated charts update and move dynamically alongside the addition of new links to the store.

# Link Categories

The user can view a category breakdown on their store and jump to a filtered link list based on a category of thier choosing.

# LinkTimeLine

The user can view a sequential chart of thier links over time and by time of day at which they were saved. The user can jump to a link from the chart dots.

### Requirements

- Node.js >= 12.22.0

### Directory Structure

- [`.husky`](.husky) — Husky configuration and hooks.<br>
- [`public`](./public) — Static assets such as robots.txt, images, and favicon.<br>
- [`src`](./src) — Application source code, including pages, components, styles.

### Scripts

- `npm dev` — Starts the application in development mode at `http://localhost:3000`.
- `npm build` — Creates an optimized production build of your application.
- `npm start` — Starts the application in production mode.
- `npm lint` — Runs ESLint for all files in the `src` directory.
- `npm format` — Runs Prettier for all files in the `src` directory.
