import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import EditMembers from "@/components/EditMembers";
import DeleteMembers from "@/components/DeleteMembers";
import axios from "axios";

const ListMembers = () => {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error("Token tidak ditemukan");
          return;
        }

        const response = await axios.get("https://team-a-spk-internet-service-provider.vercel.app/api/v1/memberships/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        
        if (response.data.status && response.data.data) {
          
          if (Array.isArray(response.data.data)) {
            setMembers(response.data.data);
          } else {
            setMembers([response.data.data]); 
          }
          console.log("List Data Pelanggan berhasil tampil:", response.data.data);
        } else {
          console.error("Error fetching data:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchMembers();
  }, []);

  return (
    <div>
      <Table>
        <TableCaption>Data Pelanggan Data Buana Nusantara - Kamil</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">No</TableHead>
            <TableHead className="w-[150px]">Nama Lengkap</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>No. WhatsApp</TableHead>
            <TableHead>Alamat</TableHead>
            <TableHead>Role</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {members.map((data, index) => (
            <TableRow key={data.id}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>{data.user.name}</TableCell>
              <TableCell>{data.user.auth.email}</TableCell>
              <TableCell>{data.user.phoneNumber}</TableCell>
              <TableCell>{data.user.address}</TableCell>
              <TableCell
                className={
                  data.user.role === "MEMBER"
                    ? "bg-yellow-200"
                    : data.user.role === "ADMIN"
                    ? "bg-red-200"
                    : ""
                }
              >
                {data.user.role}
              </TableCell>
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

export default ListMembers;
