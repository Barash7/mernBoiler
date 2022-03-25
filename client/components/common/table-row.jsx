import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { changeItemAmount, removeCurrentItem } from '../../redux/reducers/cart'

const TableRow = ({ id, n }) => {
  const dispatch = useDispatch()
  const product = useSelector((store) => store.products.list)
  const prodInCart = useSelector((s) => s.cart.list)
  const { rates, currencyName } = useSelector((store) => store.settings)
  return (
    <tr>
      <td>{n}</td>
      <td className="product__image w-4">
        <img src={product[id].image} alt={product[id].title} />
      </td>
      <td className="product__title">{product[id].title}</td>
      <td className="product__price">{(product[id].price * rates[currencyName]).toFixed(2)} {currencyName}</td>
      <td className="product__amount">
        <div className="custom-number-input h-10 w-32">
          <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
            <button
              type="button"
              data-action="decrement"
              className=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none"
              onClick={() => {
                dispatch(changeItemAmount(id, -1))
              }}
            >
              <span className="m-auto text-2xl font-thin">−</span>
            </button>
            <span className="outline-none focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700  outline-none">{prodInCart[id].amount}</span>
            <button
              type="button"
              data-action="increment"
              className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer"
              onClick={() => {
                dispatch(changeItemAmount(id, 1))
              }}
            >
              <span className="m-auto text-2xl font-thin">+</span>
            </button>
          </div>
        </div>
        {prodInCart[id].amount}
      </td>
      <td className="product__product__total__price">{(product[id].price * rates[currencyName] * prodInCart[id].amount).toFixed(2)} {currencyName}</td>
      <td>
        <button
          type="button"
          className="border rounded p-2"
          onClick={() => dispatch(removeCurrentItem(id))}
        >
          Remove
        </button>
      </td>
    </tr>
  )
}

export default TableRow
