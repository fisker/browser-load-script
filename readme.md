# browser-load-script

[![Build Status][github_actions_badge]][github_actions_link]
[![Coverage][coveralls_badge]][coveralls_link]
[![Npm Version][package_version_badge]][package_link]
[![MIT License][license_badge]][license_link]

[github_actions_badge]: https://img.shields.io/github/workflow/status/fisker/browser-load-script/CI/main?style=flat-square
[github_actions_link]: https://github.com/fisker/browser-load-script/actions?query=branch%3Amain
[coveralls_badge]: https://img.shields.io/coveralls/github/fisker/browser-load-script/main?style=flat-square
[coveralls_link]: https://coveralls.io/github/fisker/browser-load-script?branch=main
[license_badge]: https://img.shields.io/npm/l/browser-load-script.svg?style=flat-square
[license_link]: https://github.com/fisker/browser-load-script/blob/main/license
[package_version_badge]: https://img.shields.io/npm/v/browser-load-script.svg?style=flat-square
[package_link]: https://www.npmjs.com/package/browser-load-script

> Load script in browser.

## Install

```bash
yarn add browser-load-script
```

## Usage

```html
<script type="importmap">
  {
    "imports": {
      "browser-load-script": "https://unpkg.com/browser-load-script"
    }
  }
</script>
<script type="module">
  import loadScript from 'browser-load-script'

  await loadScript('data:application/javascript,')
</script>
```

## API

### `loadScript(sourceOrProperties)`

```js
import loadScript from 'browser-load-script'

await loadScript('https://example.com/script.js')
```

#### `sourceOrProperties`

- Type: `string | Object`

[Available properties](https://developer.mozilla.org/en-US/docs/Web/API/HTMLScriptElement#instance_properties)

```js
import loadScript from 'browser-load-script'

await loadScript({
  src: 'https://example.com/script.js',
  defer: true,
  crossOrigin: 'anonymous',
})
```
