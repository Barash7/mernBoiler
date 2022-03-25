import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { changeCurrency, setSortToggle } from '../redux/reducers/settings'
import { sortProducts } from '../redux/reducers/products'

const ButtonGroup = () => {
  const dispatch = useDispatch()
  const { sort } = useSelector((s) => s.settings)

  const sortByType = (sortType) => {
    return () => {
      dispatch(setSortToggle(sortType))
      dispatch(sortProducts(sortType, sort[sortType]))
    }
  }
  return (
    <div className="inline-flex shadow-sm rounded-md" role="group">
      <button
        type="button"
        className="rounded-l-lg border border-gray-200 bg-white text-sm font-medium w-12 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 hover:bg-gray-100 hover:text-blue-700"
        onClick={() => dispatch(changeCurrency('USD'))}
      >
        USD
      </button>
      <button
        type="button"
        className="border-t border-b border-gray-200 bg-white text-sm font-medium w-12 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 hover:bg-gray-100 hover:text-blue-700"
        onClick={() => dispatch(changeCurrency('EUR'))}
      >
        EUR
      </button>
      <button
        type="button"
        className="rounded-r-md border border-gray-200 bg-white text-sm font-medium w-12 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 hover:bg-gray-100 hover:text-blue-700"
        onClick={() => dispatch(changeCurrency('CAD'))}
      >
        CAD
      </button>
      <div className="inline-flex shadow-sm rounded-md m-4" role="group">
        <button
          type="button"
          className="rounded-l-lg border border-gray-200 bg-white text-sm font-medium w-12 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 hover:bg-gray-100 hover:text-blue-700"
          onClick={sortByType('name')}
        >
          Name
          <span>{sort.name ? '▲' : '▼'}</span>
        </button>
        <button
          type="button"
          className="rounded-r-md border border-gray-200 bg-white text-sm font-medium w-12 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 hover:bg-gray-100 hover:text-blue-700"
          onClick={sortByType('price')}
        >
          Price
          <span>{sort.price ? '▲' : '▼'}</span>
        </button>
      </div>
    </div>
  )
}

export default React.memo(ButtonGroup)
