import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { getProductsFromServer } from '../redux/reducers/products'
import ProductCard from './product-card'

const Products = () => {
  const productList = useSelector((s) => s.products.list)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getProductsFromServer())
  }, [])
  return (
    <div className="flex flex-wrap space-x-2 m-2">
      { Object.values(productList).map((prod) => (
        <ProductCard key={prod.id} product={prod} />
      ))}
    </div>
  )
}

export default React.memo(Products)
