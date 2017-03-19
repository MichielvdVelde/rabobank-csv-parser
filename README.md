# CSV Transaction Parser for Rabobank

[![Standard - JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

I built this module to parse my bank's CSV transaction files.

[The file format is laid out here](https://www.rabobank.nl/images/formaatbeschrijving_csv_kommagescheiden_nieuw_29539176.pdf) (Dutch).
I have no idea if this format enjoys any kind of universality, though...

## Install

```bash
npm i rabobank-csv-parser
```

## Usage

### Example code

I am using [csv-streamify](https://github.com/klaemo/csv-stream) to pre-parse the CSV file.

```js
const fs = require('fs')
const CSVStreamify = require('csv-streamify')
const RaboCSVParser = require('rabobank-csv-parser')

const csvParser = CSVStreamify()
const raboParser = new RaboCSVParser()

// A `data` event is emitted for each row
raboParser.on('data', function (row) {
  // `data` is a Buffer, so we first convert it to JSON
  row = JSON.parse(row.toString())

  // Do what you want with it - displaying it, for example
  console.log(row)
})

// Pipe a file stream through csv-streamify and then this module
fs.createReadStream('transactions.txt').pipe(csvParser).pipe(raboParser)
```

### Example output

The data in this example output has been faked (obviously). The ouput is a single row
(or one `data` event).

```json
{
  "account_iban": "NL08RABO2952747327",
  "currency": "EUR",
  "interest_date": "2017-03-09",
  "credit_or_debit": "D",
  "amount": 100,
  "counter_iban": "NL08RABO2952747327",
  "counter_name": "",
  "date": "2017-03-09",
  "code": "",
  "filler": "",
  "desc1": "Afschrijving",
  "desc2": "",
  "desc3": "",
  "desc4": "",
  "desc5": "",
  "desc6": "",
  "end_to_end_id": "",
  "counter_id": "",
  "mandate_id": ""
}
```

### Changelog

* **v0.0.3** (19-03-2017)
  * Dates are now in format YYYY-MM-DD instead of a `Date` object

[![Standard - JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

### License

Copyright 2017 [Michiel van der Velde](http://www.michielvdvelde.nl).

This software is licensed under the [MIT License](LICENSE).
