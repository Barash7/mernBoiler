const ADD_ITEM = '@card/ADD_ITEM'
const INCREASE_AMOUNT = '@cart/CHANGE_AMOUNT'
const DECREASE_AMOUNT = '@cart/DECREASE_AMOUNT'
const REMOVE_ITEM = '@cart/REMOVE_ITEM'

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
    default:
      return state
  }
}

export const addItem = (id) => {
  return (dispatch, getState) => {
    const { list } = getState().cart
    const productsList = getState().products.list
    const { price } = productsList[id]
    const itemAmount = typeof list[id] === 'undefined' ? 1 : list[id].amount + 1
    return dispatch({
      type: ADD_ITEM,
      payload: {
        list: {
          ...list,
          [id]: { amount: itemAmount }
        },
        price
      }
    })
  }
}

export const changeItemAmount = (id, count) => {
  return (dispatch, getState) => {
    const { list } = getState().cart
    const { amount } = list[id]
    const newAmount = amount + count
    if (count > 0) {
      dispatch({
        type: INCREASE_AMOUNT,
        payload: {
          [id]: { amount: newAmount }
        }
      })
    }
    if (count < 0) {
      dispatch({
        type: DECREASE_AMOUNT,
        payload: {
          [id]: { amount: newAmount }
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
  }
}
