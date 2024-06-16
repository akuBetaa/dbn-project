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
import EditMembers from "@/components/member/EditMembers";
import DeleteMembers from "@/components/member/DeleteMembers";
import axios from "axios";

const ListComplaint = () => {
  const [members, setMembers] = useState([]);
  const [complaint, setComplaint] = useState([]);

  const fetchComplaint = async () => {
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
          // Menyimpan data dari API ke state complaint
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

  // Fungsi untuk mengurutkan data berdasarkan rankScore tertinggi ke terendah
  const sortComplaintByRankScore = () => {
    const sortedComplaint = [...complaint].sort((a, b) => b.ahp.rankScore - a.ahp.rankScore);
    return sortedComplaint;
  };

  const getStatusClassName = (status) => {
    switch (status) {
      case "PENDING":
        return "font-bold text-red-500";
      case "PROCESS":
        return "font-bold text-yellow-500";
      case "FINISHED":
        return "font-bold text-green-500";
      default:
        return "";
    }
  };

  const handleSave = (updatedMember) => {
    setMembers((prevMembers) =>
      prevMembers.map((member) =>
        member.id === updatedMember.id ? updatedMember : member
      )
    );
  };

  const handleDeleteSuccess = (id) => {
    setComplaint((prevComplaint) => prevComplaint.filter(item => item.id !== id));
  };

  return (
    <div>
      <Table>
        <TableCaption>Data Aduan Data Buana Nusantara - Kamil</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">No</TableHead>
            <TableHead className="w-[130px]">Nama Lengkap</TableHead>
            <TableHead className="w-[150px]">Tanggal</TableHead>
            <TableHead>Alamat</TableHead>
            <TableHead>Jarak</TableHead>
            <TableHead>Permasalahan</TableHead>
            <TableHead>Deskripsi</TableHead>
            <TableHead>Status</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* {complaint.map((data, index) => ( */}
          {sortComplaintByRankScore().map((data, index) => (
            <TableRow key={data.id}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>{data.user.name}</TableCell>
              <TableCell>{data.timeOfIncident}</TableCell>
              <TableCell>{data.user.address}</TableCell>
              <TableCell>{data.locationDistance}</TableCell>
              <TableCell>
                {data.problem === "INSTALLATION" ? "Pemasangan WIFI" :
                  data.problem === "DAMAGE" ? "Wifi Mati" :
                    data.problem === "DEVICE_PROBLEMS" ? "Kerusakan Device" :
                      data.problem === "SPEED_INCREASE" ? "Penambahan Kecepatan" :
                        data.problem === "REPORT" ? "Wifi Lemot" : ""}
              </TableCell>
              <TableCell>{data.description}</TableCell>
              <TableCell className={getStatusClassName(data.status)}>
                {data.status === "PENDING" ? "belum dikerjakan" :
                  data.status === "PROCESS" ? "sedang dikerjakan" :
                    data.status === "FINISHED" ? "selesai" : ""}
              </TableCell>
              <TableCell className="flex flex-col md:flex-row justify-center items-center gap-2">
              <EditMembers
                  member={data} 
                  onSave={handleSave} />
                <DeleteMembers
                  memberId={data.id}
                  memberName={data.user.name}
                  onDeleteSuccess={handleDeleteSuccess} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ListComplaint;
