import axios from 'axios'
import { readFile } from 'fs/promises'

export const sortProductsList = (arrayOfProducts, sortType, direction) => {
  switch (sortType) {
    case 'name': {
      arrayOfProducts.sort((a, b) => {
        if (direction) {
          return a.title.localeCompare(b.title)
        }
        return b.title.localeCompare(a.title)
      })
    }
    /* falls through */
    case 'price': {
      arrayOfProducts.sort((a, b) => {
        if (direction) {
          return a.price - b.price
        }
        return b.price - a.price
      })
    }
    /* falls through */
    default:
      return arrayOfProducts
  }
}

export const getProductFunc = () => {
  return readFile(`${__dirname}/../data/data.json`, 'utf-8')
    .then((data) => JSON.parse(data))
    .catch(() => [])
}

export const getsRates = () => {
  const url = 'https://api.exchangerate.host/latest?base=USD&symbols=USD,EUR,CAD'
  const mockRates = {
    CAD: 1.3,
    EUR: 0.9,
    USD: 1
  }
  return axios(url)
    .then(({ data }) => data.rates)
    .catch(() => mockRates)
}
