import { firstText, secondText, thirdText } from './texts.js'
import { countSymbolsInString } from './helpers.js'

const alphabet = [
  'а', 'б', 'в', 'г', 'ґ', 'д', 'е', 'є', 'ж', 'з', 'и', 'і', 'ї',
  'й', 'к', 'л', 'м', 'н', 'о', 'п', 'р', 'с', 'т',
  'у', 'ф', 'х', 'ц', 'ч', 'ш', 'щ', 'ь', 'ю', 'я',
]

let regex = /[.,-:?'";!()—–”“’\s]/g

let clearedFirstText = firstText.replace(regex, '')
let clearedSecondText = secondText.replace(regex, '')
let clearedThirdText = thirdText.replace(regex, '')

const firstTextCount = countSymbolsInString(clearedFirstText.toLocaleLowerCase())
const secondTextCount = countSymbolsInString(clearedSecondText.toLocaleLowerCase())
const thirdTextCount = countSymbolsInString(clearedThirdText.toLocaleLowerCase())

alphabet.forEach(symbol => {
  let count = firstTextCount[symbol] || 0
  console.log(`${symbol} : ${count / clearedFirstText.length * 100} %`);
})

alphabet.forEach(symbol => {
  let count = secondTextCount[symbol] || 0
  console.log(`${symbol} : ${count / clearedSecondText.length * 100} %`);
})

alphabet.forEach(symbol => {
  let count = thirdTextCount[symbol] || 0
  console.log(`${symbol} : ${count / clearedThirdText.length * 100} %`);
})

let entrophy1 = 0
alphabet.forEach(symbol => {
  let count = firstTextCount[symbol] || 0
  let p = count / clearedFirstText.length
  if (!p) return
  entrophy1 += p * Math.log2(p)
})
console.log('Cередня ентропія алфавіту', -entrophy1);
console.log('Кількість інформації', -entrophy1 * clearedFirstText.length);

let entrophy2 = 0
alphabet.forEach(symbol => {
  let count = secondTextCount[symbol] || 0
  let p = count / clearedSecondText.length
  if (!p) return
  entrophy2 += p * Math.log2(p)
})
console.log('Cередня ентропія алфавіту', -entrophy2);
console.log('Кількість інформації', -entrophy2 * clearedFirstText.length);

let entrophy3 = 0
alphabet.forEach(symbol => {
  let count = thirdTextCount[symbol] || 0
  let p = count / clearedSecondText.length
  if (!p) return
  entrophy3 += p * Math.log2(p)
})
console.log('Cередня ентропія алфавіту', -entrophy3);
console.log('Кількість інформації', -entrophy3 * clearedThirdText.length);

let encoded1 = Buffer.from(clearedFirstText).toString('base64')
const encoded1Count = countSymbolsInString(encoded1.toLocaleLowerCase())

let entrophyEncoded1 = 0
for (let key in encoded1Count) {
  let count = encoded1Count[key]
  let p = count / encoded1.length
  entrophyEncoded1 += p * Math.log2(p)
}

console.log(-entrophyEncoded1 * encoded1.length);

let encoded2 = Buffer.from(clearedSecondText).toString('base64')
const encoded2Count = countSymbolsInString(encoded2.toLocaleLowerCase())

let entrophyEncoded2 = 0
for (let key in encoded2Count) {
  let count = encoded2Count[key]
  let p = count / encoded2.length
  entrophyEncoded2 += p * Math.log2(p)
}

console.log(-entrophyEncoded2 * encoded2.length);

let encoded3 = Buffer.from(clearedThirdText).toString('base64')
const encoded3Count = countSymbolsInString(encoded3.toLocaleLowerCase())

let entrophyEncoded3 = 0
for (let key in encoded3Count) {
  let count = encoded3Count[key]
  let p = count / encoded3.length
  entrophyEncoded3 += p * Math.log2(p)
}

console.log(-entrophyEncoded3 * encoded3.length);

let base64gzip2 = `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`

let encodedzip = Buffer.from(base64gzip2).toString('base64')
const encodedZipCount = countSymbolsInString(encodedzip.toLocaleLowerCase())

let entrophyEncodedZip = 0
for (let key in encodedZipCount) {
  let count = encodedZipCount[key]
  let p = count / encodedzip.length
  entrophyEncodedZip += p * Math.log2(p)
}

console.log(-entrophyEncodedZip * encodedzip.length);