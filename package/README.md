# 📦 npm package - utils

This is code of npm package with most used utils functions.

Install with command:

```
npm install @bengr.digital/utils
```

<br>

### 📢 Publish package

- go to folder with package `cd ./package`
- `npm run compile` for compile (or `npx tsc`)
- update version of package in `package.json` if you already didn't
- `npm run publish` for publish (or `npm publish --access=public`)

**Every time check that code is working before publish!**

### 🧪 Test package

- go to test folder `cd ./test`
- run `npm link ../package` for download **unpublished** package
- import new functionality and try it 🧐

```ts
import { newFunction } from '@bengr.digital/utils';

newFunction();
```

- Install typescript globaly
- compile with typescript `tsc index.ts`
- and run with `node index.js`
