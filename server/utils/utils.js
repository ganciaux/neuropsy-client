const datefns = require('date-fns')

const charPad = (num, places, char) => {
  let defaultChar = '0'
  if (char) defaultChar = char
  return String(num).padStart(places, defaultChar)
}

const getReference = (date, count, pattern) => {
  let defaultPattern = ''
  if (pattern) defaultPattern = pattern
  const year = date.getFullYear()
  return `${defaultPattern}${year}${charPad(date.getMonth() + 1, 2)}${charPad(
    count,
    4,
  )}`
  //throw new Error(`Can't set new ${model} reference (${year})`);
}

const getArticlesPrice = (articles) => {
  let price = 0.0
  articles.forEach(
    (element) =>
      (price += Math.round(element.quantity * element.unitCost * 100) / 100),
  )
  return price
}

const formatDate = (date) => {
  /*
  return `${date.getFullYear()}/${charPad(date.getMonth() + 1, 2)}/${charPad(
    date.getDay(),
    2,
  )}`
  */
  return datefns.format(Date.parse(date), 'dd-MM-yyyy')
}

const getDateYear = () => {
  return datefns.getYear(new Date())
}

const getDateInfo = (date) => {
  const newDate = Date.parse(date)
  return {
    day: datefns.getDate(newDate),
    month: datefns.getMonth(newDate) + 1,
    year: datefns.getYear(newDate),
  }
}
const getAge = (date) => {
  let age = '-'
  const start = getDateInfo(date)
  const end = getDateInfo(new Date())
  try {
    const data = datefns.intervalToDuration({
      start: new Date(start.year, start.month, start.day, 0, 0, 0),
      end: new Date(end.year, end.month, end.day, 0, 0, 0),
    })

    if (data.years > 0) {
      age = `${data.years} an`
      if (data.years > 1) {
        age += 's'
      }
    }
    if (data.months > 0) {
      age += ` ${data.months} mois`
    }
    if (data.days > 0) {
      age += ` ${data.days} jour`
      if (data.days > 1) {
        age += 's'
      }
    }
  } catch (err) {
    console.log('utils.js: getAge(): error')
  }

  return age
}

exports.charPad = charPad
exports.getReference = getReference
exports.getArticlesPrice = getArticlesPrice
exports.formatDate = formatDate
exports.getAge = getAge
exports.getDateYear = getDateYear
