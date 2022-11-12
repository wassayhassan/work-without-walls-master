import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableFooter from '@mui/material/TableFooter';


export default function OrderTable({orderDetails}) {
    const rows = [{description: 'I wil develop thi sand that', quantity: 1, dealTime: 10, budget: 70}]
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Item</TableCell>
            <TableCell align="right">QTY.</TableCell>
            <TableCell align="right">Duration</TableCell>
            <TableCell align="right">Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, idx) => (
            <TableRow
              key={idx}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.description}
              </TableCell>
              <TableCell align="right">{row.quantity}</TableCell>
              <TableCell align="right">{row.dealTime}</TableCell>
              <TableCell align="right">{row.budget}</TableCell>

            </TableRow>
          ))}
          <TableRow>
          <TableCell component="th" scope="row" colSpan={3}>
              <p className='font-semibold text-base'>Total</p> 
              </TableCell>
              <TableCell align="right">$70</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}