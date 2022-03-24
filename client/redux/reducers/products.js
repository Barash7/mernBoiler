const GET_PRODUCTS = '@products/GET_PRODUCTS'

const initialState = {
  list: {}
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS: {
      return {
        ...state,
        list: action.payload
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
      .then((array) => array.reduce((acc, rec) => {
        acc[rec.id] = rec
        return acc
      }, {}))
      .then((product) => dispatch({ type: GET_PRODUCTS, payload: product }))
      .catch((err) => console.log(err))
  }
}
