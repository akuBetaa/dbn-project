import React, { useState } from "react";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

const ShowMembers = () => {
    return (
        <div className="">
            {/* <div className="flex flex-col text-center items-center font-semibold text-2xl">
                <h1 className="py-2">Profil Pelanggan</h1>
                <hr className="w-2/3 center" />
            </div> */}
            <div className="px-5">
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell>Nomor Token</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>ID Pelanggan</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Nama Pelanggan</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Permasalahan</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Deskripsi Permasalahan</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Status Pengerjaan</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default ShowMembers