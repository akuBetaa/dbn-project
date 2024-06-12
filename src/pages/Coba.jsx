import React from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table"

import { fakeTokens } from "@/lib/data";

const Coba = () => (
  <Table>
    <TableBody>
      <TableRow>
        <TableCell>Nomor Token</TableCell>
        {fakeTokens.map((fakeTokens, index) => (
          <TableCell key={index}>{fakeTokens.token}</TableCell>
        ))}
      </TableRow>
      <TableRow>
        <TableCell>ID Pelanggan</TableCell>
        {fakeTokens.map((fakeTokens, index) => (
          <TableCell key={index}>{fakeTokens.customerID}</TableCell>
        ))}
      </TableRow>
    </TableBody>
  </Table>
);

export default Coba