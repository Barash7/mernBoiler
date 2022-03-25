import { LOADED } from './settings'

const GET_PRODUCTS = '@products/GET_PRODUCTS'

const initialState = {
  list: {}
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS: {
      return {
        ...state,
        list: action.payload.reduce((acc, rec) => {
          acc[rec.id] = rec
          return acc
        }, {})
      }
    }
    default:
      return state
  }
}

export const getProductsFromServer = () => {
  return (dispatch) => {
    fetch('/api/v1/products')
      .then((data) => data.json())
      .then((product) => {
        dispatch({ type: GET_PRODUCTS, payload: product })
        dispatch({ type: LOADED, payload: true })
      })
      .catch((err) => console.log(err))
  }
}

export const sortProducts = (sortType, direction) => {
  return (dispatch, getState) => {
    const { pathname } = getState().router.location
    if (pathname === '/') {
      fetch('/api/v1/sort', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ sortType, direction })
      })
        .then((data) => data.json())
        .then((sortedArray) => dispatch({ type: GET_PRODUCTS, payload: sortedArray }))
        .catch((err) => console.log(err))
    }
  }
}
