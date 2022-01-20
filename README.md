# Svelte Preview

Provides a time-saving command to automatically replace your Svelte project's `main.js`'s import target with your currently active `.svelte` file.

## Features

By default, a Svelte application's main component can be set by modifying the line that imports `App` in `main.js`:

```js
import App from './App.svelte';
```

Svelte Preview adds a command to the command palette, available whenever a `.svelte` file is loaded, which attempts to detect the most relevant `main.js` file in the workspace and replace the first line in that file with a line that imports the currently loaded `.svelte` file. Following the above example, if the currently opened file is `LoginPage.svelte`, the first line in `main.js` will be replaced with:

```js
import App from './LoginPage.svelte';
```

## Known Issues

* Does not work with TypeScript Svelte projects
* Changes to `main.js` are not saved automatically (user needs to manually save once the text replacement is complete)

## Release Notes

### 0.1.0

Initial release of Svelte Preview
