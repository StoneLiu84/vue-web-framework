import store from './store'

function dataDictionaryFormatter (row, column, field) {
  if (row && column && column.property) {
    if (!field) {
      field = column.property
    }
    let data = store.getters.dataDictionary[field]
    if (!data) return ''
    for (let i = 0, len = data.length; i < len; i++) {
      if (row[column.property] === data[i].value) {
        return data[i].text
      }
    }
  } else {
    return ''
  }
}

function datetimeFormatter (row, column, format) {
  if (row && column && column.property) {
    let field = column.property
    let value = row[field]

    if (!value) return ''

    if (typeof value === 'string') {
      value = Date.parse(value)
    }
    return Date.format(value, format)
  } else {
    return ''
  }
}

export default {
  dataDictionary (row, column, field) {
    return dataDictionaryFormatter(row, column, field)
  },
  datetime (row, column) {
    return datetimeFormatter(row, column, 'yyyy-MM-dd hh:mm:ss')
  },
  date (row, column) {
    return datetimeFormatter(row, column, 'yyyy-MM-dd')
  }
}
