import React from 'react'
import { useSelector } from 'react-redux'

import Head from './head'
import Header from './header'
import Table from './common/table'

const Cart = () => {
  // const product = useSelector((store) => store.products.list)
  const { totalAmount, totalPrice, list: prodInCart } = useSelector((s) => s.cart)
  const { rates, currencyName } = useSelector((store) => store.settings)
  return (
    <div className="flex flex-col">
      <Head title="Cart" />
      <Header caption="Igoris shop" />
      <Table data={Object.keys(prodInCart)} />
      { /* <div>
        {Object.keys(prodInCart).map((it) => {
          return (
            <div key={it} className="flex">
              <div className="product__title">{product[it].title}</div>
              <div className="product__price">{product[it].price}</div>
              <div className="product__amount">{prodInCart[it].amount}</div>
              <div className="product__product__total__price">{prodInCart[it]?.totalPrice}</div>
              <img className="product__image" src={product[it].image} alt={product[it].title} />
            </div>
          )
        })}
      </div> */ }
      <div id="total-amount">{totalAmount}</div>
      <div id="total-price">
        {(totalPrice * rates[currencyName]).toFixed(2)} {currencyName}
      </div>
    </div>
  )
}

export default React.memo(Cart)
