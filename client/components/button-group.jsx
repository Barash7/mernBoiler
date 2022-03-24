import React from 'react'
import { useDispatch } from 'react-redux'

import { changeCurrency } from '../redux/reducers/settings'

const ButtonGroup = () => {
  const dispatch = useDispatch()
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
    </div>
  )
}

export default React.memo(ButtonGroup)
