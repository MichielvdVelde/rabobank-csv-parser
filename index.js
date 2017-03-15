const Transform = require('stream').Transform

class RaboCSVParser extends Transform {
  constructor (options) {
    super(options)

    this._columns = [
      'account_iban',
      'currency',
      'interest_date',
      'credit_or_debit',
      'amount',
      'counter_iban',
      'counter_name',
      'date',
      'code',
      'filler',
      'desc1',
      'desc2',
      'desc3',
      'desc4',
      'desc5',
      'desc6',
      'end_to_end_id',
      'counter_id',
      'mandate_id'
    ]
  }

  _transform (data, encoding, cb) {
    const line = JSON.parse(data.toString())
    const output = {}

    for (let i = 0; i < line.length; i++) {
      const column = this._columns[i]
      let value = line[i]

      switch (column) {
        case 'interest_date':
        case 'date':
          const date = [ value.slice(0, 4), value.slice(4, 6), value.slice(6) ]
          value = new Date(date[0], date[1] - 1, date[2])
          break
        case 'amount':
          value = parseFloat(value)
          break
      }

      output[column] = value
    }
    this.push(Buffer.from(JSON.stringify(output)))
    cb()
  }
}

exports = module.exports = RaboCSVParser
