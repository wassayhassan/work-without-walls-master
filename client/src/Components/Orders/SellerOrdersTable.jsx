import React from 'react'
import OrderTableRow from './OrderTableRow'
import {Table } from 'flowbite-react'

const SellerOrdersTable = ({orders}) => {
  return (
    <div>
        <Table>
            <Table.Head>
                <Table.HeadCell>
                Buyer
                </Table.HeadCell>
                <Table.HeadCell>
                Title
                </Table.HeadCell>
                <Table.HeadCell>
                Due On
                </Table.HeadCell>
                <Table.HeadCell>
                Price
                </Table.HeadCell>
                <Table.HeadCell>
                  Status
                </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
                {orders && orders.map((order)=> {
                    return <OrderTableRow order={order} />
                })}
               
            </Table.Body>
            </Table>
    </div>
  )
}

export default SellerOrdersTable