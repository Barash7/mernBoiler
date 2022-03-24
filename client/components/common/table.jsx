import React from 'react'

import TableRow from './table-row'

const Table = ({ data }) => {
  return (
    <table>
      <thead>
        <th>#</th>
        <th>Image</th>
        <th>Title</th>
        <th>Price</th>
        <th>Amount</th>
        <th>Total</th>
        <th>Remove</th>
      </thead>
      <tbody>
        {data.map((id) => (
          <TableRow key={id} id={id} />
        ))}
      </tbody>
    </table>
  )
}

export default Table
