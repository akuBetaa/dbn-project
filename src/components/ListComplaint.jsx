import React from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import EditMembers from "@/components/EditMembers";
import DeleteMembers from "@/components/DeleteMembers";
import { members } from "@/lib/data";

const ListComplaint = () => {
  return (
    <div>
      <Table>
        <TableCaption>Data Pelanggan Data Buana Nusantara - Kamil</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">No</TableHead>
            <TableHead className="w-[150px]">Nama Lengkap</TableHead>
            <TableHead>No. WhatsApp</TableHead>
            <TableHead>Alamat</TableHead>
            <TableHead>Permasalahan</TableHead>
            <TableHead>Deskripsi</TableHead>
            <TableHead>Status</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {members.map((member, index) => (
            <TableRow key={member.customerID}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>{member.customerID}</TableCell>
              <TableCell>{member.email}</TableCell>
              <TableCell>{member.fullName}</TableCell>
              <TableCell>{member.whatsappNumber}</TableCell>
              <TableCell>{member.address}</TableCell>
              <TableCell>{member.role}</TableCell>
              <TableCell className="flex flex-col md:flex-row justify-center items-center gap-2">
                <EditMembers />
                <DeleteMembers />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ListComplaint;
