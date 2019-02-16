var fs = require('fs');
const path = require('path');

const read = p => {
  return fs.readFileSync(p, 'utf8');
};
const write = (p, text) => {
  return fs.writeFileSync(p, text);
};

const filePath = path.join(
  __dirname,
  '../node_modules/@date-io/date-fns/build/date-fns-utils.d.ts',
);
const text = read(filePath)
  .replace(
    'import SampleLocale from "date-fns/locale/en-US";',
    'import { enUS as SampleLocale } from "date-fns/locale";',
  )
  .replace(
    "import SampleLocale from 'date-fns/locale/en-US';",
    "import { enUS as SampleLocale } from 'date-fns/locale';",
  );
console.info(filePath);
console.info(text);
write(filePath, text);
