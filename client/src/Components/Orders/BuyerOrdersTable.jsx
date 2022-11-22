import React from 'react'
import BuyerOrderTableRow from './BuyerOrderTableRow'
import {Table } from 'flowbite-react'

const BuyerOrdersTable = ({orders}) => {
  return (
    <div>
        <Table>
            <Table.Head>
                <Table.HeadCell>
                Seller
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
                    return <BuyerOrderTableRow order={order} />
                })}
               
            </Table.Body>
            </Table>
    </div>
  )
}

export default BuyerOrdersTable