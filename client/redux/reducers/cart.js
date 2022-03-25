const ADD_ITEM = '@card/ADD_ITEM'
const INCREASE_AMOUNT = '@cart/CHANGE_AMOUNT'
const DECREASE_AMOUNT = '@cart/DECREASE_AMOUNT'
const REMOVE_ITEM = '@cart/REMOVE_ITEM'
const TOTAL_VALUES = '@cart/TOTAL_VALUES'

const initialState = {
  list: {},
  totalPrice: 0,
  totalAmount: 0,
  tamporaryPrice: 0
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM: {
      return {
        ...state,
        list: action.payload.list,
        totalAmount: state.totalAmount + 1,
        totalPrice: state.totalPrice + action.payload.price
      }
    }
    case INCREASE_AMOUNT:
    case DECREASE_AMOUNT: {
      return {
        ...state,
        list: {
          ...state.list,
          ...action.payload
        }
      }
    }
    case REMOVE_ITEM: {
      return {
        ...state,
        list: action.payload
      }
    }
    case TOTAL_VALUES: {
      return {
        ...state,
        totalPrice: action.payload.totalPrice,
        totalAmount: action.payload.totalAmount
      }
    }
    default:
      return state
  }
}

export const addItem = (id) => {
  return (dispatch, getState) => {
    const { list } = getState().cart
    const productsList = getState().products.list
    const product = productsList[id]
    const itemAmount = typeof list[id] === 'undefined' ? 1 : list[id].amount + 1
    return dispatch({
      type: ADD_ITEM,
      payload: {
        list: {
          ...list,
          [id]: { ...product, amount: itemAmount }
        },
        price: product.price
      }
    })
  }
}

export const changeItemAmount = (id, count) => {
  return (dispatch, getState) => {
    const { list, totalAmount, totalPrice } = getState().cart
    const { price } = getState().cart.list[id]
    const { amount } = list[id]
    const newAmount = amount + count
    if (count > 0) {
      dispatch({
        type: INCREASE_AMOUNT,
        payload: {
          [id]: { ...list[id], amount: newAmount }
        }
      })
    }
    if (count < 0) {
      dispatch({
        type: DECREASE_AMOUNT,
        payload: {
          [id]: { ...list[id], amount: newAmount }
        }
      })
    }
    if (newAmount <= 0) {
      delete list[id]
      dispatch({
        type: REMOVE_ITEM,
        payload: list
      })
    }
    dispatch({
      type: TOTAL_VALUES,
      payload: {
        totalPrice: totalPrice + price * count,
        totalAmount: totalAmount + count
      }
    })
  }
}

export const removeCurrentItem = (id) => {
  return (dispatch, getState) => {
    const { list, totalAmount, totalPrice } = getState().cart
    const { price } = getState().cart.list[id]
    const removedProductAmount = list[id].amount
    delete list[id]
    dispatch({
      type: REMOVE_ITEM,
      payload: list
    })
    dispatch({
      type: TOTAL_VALUES,
      payload: {
        totalPrice: totalPrice - price * removedProductAmount,
        totalAmount: totalAmount - removedProductAmount
      }
    })
  }
}
