import AdminLayout from '@/components/layout/AdminLayout';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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


const Dashboard = () => {
  const [totalComplaints, setTotalComplaints] = useState(0);
  const [pendingComplaints, setPendingComplaints] = useState(0);
  const [inProcessComplaints, setInProcessComplaints] = useState(0);
  const [finishedComplaints, setFinishedComplaints] = useState(0);
  const [topComplaints, setTopComplaints] = useState([]);

  useEffect(() => {
    const fetchStatistics = async () => {
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
          const complaints = response.data.data;
          setTotalComplaints(complaints.length);
          setPendingComplaints(complaints.filter(c => c.status === 'PENDING').length);
          setInProcessComplaints(complaints.filter(c => c.status === 'PROCESS').length);
          setFinishedComplaints(complaints.filter(c => c.status === 'FINISHED').length);

          const sortedComplaints = [...complaints].sort((a, b) => b.ahp.rankScore - a.ahp.rankScore);
          setTopComplaints(sortedComplaints.slice(0, 3));
        } else {
          console.error("Error fetching data:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchStatistics();
  }, []);


  return (
    <AdminLayout title="Dashboard">
      <div className='container'>
        <div className='grid grid-cols-4 gap-5'>
          <div className='border border-border rounded-xl p-5'>
            <p className='pb-2'>Total Aduan</p>
            <h1 className='font-semibold text-6xl tracking-wider'>
              {totalComplaints}
            </h1>
          </div>
          <div className='border border-border rounded-xl p-5'>
            <p className='pb-2'>Aduan Dikerjakan</p>
            <h1 className='font-semibold text-6xl tracking-wider'>
              {inProcessComplaints}
            </h1>
          </div>
          <div className='border border-border rounded-xl p-5'>
            <p className='pb-2'>Aduan Belum Dikerjakan</p>
            <h1 className='font-semibold text-6xl tracking-wider'>
              {pendingComplaints}
            </h1>
          </div>
          <div className='border border-border rounded-xl p-5'>
            <p className='pb-2'>Aduan Selesai</p>
            <h1 className='font-semibold text-6xl tracking-wider'>
              {finishedComplaints}
            </h1>
          </div>
        </div>

        {/* Top List berdasarkan rank AHP  */}
        <div>
          <div className='py-5 pt-12'>
            <h1 className='font-medium text-xl'>
              3 Top AHP Wajib Segera di Selesaikan
            </h1>
          </div>
          <div className='border border-border'>
            <Table>
              {/* <TableCaption>Data Aduan Data Buana Nusantara - Kamil</TableCaption> */}
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
                {topComplaints.map((complaint, index) => (
                  <TableRow key={complaint.id}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell>{complaint.user.name}</TableCell>
                    <TableCell>{complaint.timeOfIncident}</TableCell>
                    <TableCell>{complaint.user.address}</TableCell>
                    <TableCell>{complaint.locationDistance}</TableCell>
                    <TableCell>
                      {complaint.problem === "INSTALLATION" ? "Pemasangan WIFI" :
                        complaint.problem === "DAMAGE" ? "Wifi Mati" :
                          complaint.problem === "DEVICE_PROBLEMS" ? "Kerusakan Device" :
                            complaint.problem === "SPEED_INCREASE" ? "Penambahan Kecepatan" :
                              complaint.problem === "REPORT" ? "Wifi Lemot" : ""}
                    </TableCell>
                    <TableCell>{complaint.description}</TableCell>
                    <TableCell className={getStatusClassName(complaint.status)}>
                      {complaint.status === "PENDING" ? "belum dikerjakan" :
                        complaint.status === "PROCESS" ? "sedang dikerjakan" :
                          complaint.status === "FINISHED" ? "selesai" : ""}
                    </TableCell>
                    {/* <TableCell className="flex flex-col md:flex-row justify-center items-center gap-2">
                  <EditMembers
                    member={data}
                    onSave={handleSave} />
                  <DeleteMembers
                    memberId={data.id}
                    memberName={data.user.name}
                    onDeleteSuccess={handleDeleteSuccess} />
                </TableCell> */}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

export default Dashboard;