# pkg node-adodb demo

Example repo for [vercel/pkg#736](https://github.com/vercel/pkg/issues/736) demonstrating how to use [node-adodb](https://github.com/nuintun/node-adodb/blob/master/README-EN.md) within a [pkg](https://github.com/vercel/pkg) executable. This was built for Windows-only usage since (as far as I'm aware) there are no suitable Microsoft Access drivers for node-adodb on non-Windows platforms.

## Overview

The gist of this demo is that node-adodb [spawns a CScript process](https://github.com/nuintun/node-adodb/blob/543a508b045f712f52d2138b38a72cccf52953dd/lib/proxy.js#L37) when performing database actions which requires a valid path to a lib file [`adodb.js`](https://github.com/nuintun/node-adodb/blob/543a508b045f712f52d2138b38a72cccf52953dd/lib/adodb.js). In a standard Node environment this resolves to a copy stored within `node_modules`, but within a pkg executable this cannot be directly accessed.

To mitigate this, I've added a check to see if we're running within a pkg executable and have changed the `ADODB.PATH` to a location directly next to the executable. I then copy `adodb.js` from its original `node_modules` location to the set path, allowing CScript to access it.

This copying process could in theory be performed at build-time, though you would need to distribute your built `app.exe` and copied `adodb.js` together. I personally prefer keeping `app.exe` completely portable.

## Instructions

Ensure that a Microsoft Access database named `db.mdb` is in the root project dir. Feel free to change the `DB_PATH` as necessary.

Install dependencies

```
yarn
```

Run in standard Node environment

```
node app.js
```

Build and run standalone executable

```
yarn build
app.exe
```
