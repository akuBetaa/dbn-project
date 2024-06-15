import React, { useState, useEffect } from "react";
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
import axios from "axios";

const ListComplaint = () => {
  const [ complaint, setComplaint ] = useState ([]);

  const fetchComplaint = async () => {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        console.error("Token tidak ditemukan");
        return;
      }

      const response = await axios.get("https://team-a-spk-internet-service-provider.vercel.app/api/v1/memberships/", {
        headers : {
          Authorization : `Bearer ${token}`,
        },
      });

      if (response.data.status && response.data.data) {
          
        if (Array.isArray(response.data.data)) {
          setComplaint(response.data.data);
        } else {
          setComplaint([response.data.data]); 
        }
        console.log("List Aduan berhasil tampil:", response.data.data);
      } else {
        console.error("Error fetching data:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    fetchComplaint();
  }, []);

  const getStatusClassName = (status) => {
    switch (status) {
      case "BACKLOG":
        return "font-bold text-red-500";
      case "PENDING":
        return "font-bold text-yellow-500";
      case "DONE":
        return "font-bold text-green-500";
      default:
        return "";
    }
  };
  
  return (
    <div>
      <Table>
        <TableCaption>Data Aduan Data Buana Nusantara - Kamil</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">No</TableHead>
            <TableHead className="w-[130px]">Nama Lengkap</TableHead>
            <TableHead className="w-[150px]">No. WhatsApp</TableHead>
            <TableHead>Alamat</TableHead>
            <TableHead>Jarak</TableHead>
            <TableHead>Permasalahan</TableHead>
            <TableHead>Deskripsi</TableHead>
            <TableHead>Status</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
        {complaint.map((data, index) => (
            <TableRow key={data.id}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>{data.user.name}</TableCell>
              <TableCell>{data.user.phoneNumber}</TableCell>
              <TableCell>{data.user.address}</TableCell>
              <TableCell>{data.locationDistance}</TableCell>
              <TableCell>
                {data.problem === "INSTALLATION" ? "Pemasangan WIFI" :
                 data.problem === "DAMAGE" ? "Wifi Mati" :
                 data.problem === "DEVICE_PROBLEMS" ? "Kerusakan Device" :
                 data.problem === "SPEED_INCREASE" ? "Penambahan Kecepatan" :
                 data.problem === "REPORT" ? "Wifi Lemot" : ""}
                </TableCell>
              <TableCell>masih kosong</TableCell> 
              <TableCell className={getStatusClassName(data.status)}>
                {data.status === "BACKLOG" ? "dalam antrian" :
                 data.status === "PENDING" ? "sedang dikerjakan" :
                 data.status === "DONE" ? "selesai" : ""}
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

export default ListComplaint;
