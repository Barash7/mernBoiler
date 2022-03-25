export const LOADED = '@settings/LOADED'

const GET_RATES = '@settings/GET_RATES'
const CHANGE_CURRENCY = '@settings/CHANGE_CURRENCY'
const SET_SORT_DIRECTION = '@settings/SET_SORT_DIRECTION'

const initialState = {
  loaded: false,
  rates: {
    USD: 1
  },
  currencyName: 'USD',
  sortType: 'name',
  sort: {
    name: true,
    price: true
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case LOADED: {
      return {
        ...state,
        loaded: action.payload
      }
    }
    case GET_RATES: {
      return {
        ...state,
        rates: action.payload
      }
    }
    case CHANGE_CURRENCY: {
      return {
        ...state,
        currencyName: action.payload
      }
    }
    case SET_SORT_DIRECTION: {
      return {
        ...state,
        sort: action.payload.direction,
        sortType: action.payload.sortType
      }
    }
    default:
      return state
  }
}

export const getRates = () => {
  return (dispatch) => {
    fetch('/api/v1/currency')
      .then((obj) => obj.json())
      .then((rates) => dispatch({ type: GET_RATES, payload: rates }))
      .catch((err) => console.log(err))
  }
}

export const changeCurrency = (value) => {
  return {
    type: CHANGE_CURRENCY,
    payload: value
  }
}

export const setSortToggle = (sortType) => {
  return (dispatch, getState) => {
    const { sort } = getState().settings
    dispatch({
      type: SET_SORT_DIRECTION,
      payload: {
        direction: {
          ...sort,
          [sortType]: !sort[sortType]
        },
        sortType
      }
    })
  }
}
