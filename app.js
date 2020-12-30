const fs = require('fs');
const path = require('path');
const ADODB = require('node-adodb');

// Arbitrary path, change as necessary
const DB_PATH = 'db.mdb';

if (__dirname.startsWith('C:\\snapshot')) {
  ADODB.PATH = path.join(process.cwd(), 'adodb.js');

  // fs.copyFileSync fails with pkg right now, so reading + writing instead
  // https://github.com/vercel/pkg/issues/420
  const buffer = fs.readFileSync(
    path.join(__dirname, 'node_modules/node-adodb/lib/adodb.js')
  );
  fs.writeFileSync(ADODB.PATH, buffer);
}

const connection = ADODB.open(
  `Provider=Microsoft.Jet.OLEDB.4.0;Data Source=${DB_PATH};`
);

console.log('Attempting to fetch tables...');
connection.schema(20).then(console.log);
