import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IoMdSearch } from "react-icons/io";
import toast, { Toaster } from "react-hot-toast";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import axios from "axios";

const CheckProgress = () => {
  const [token, setToken] = useState("");
  const [data, setData] = useState(null);
  const [searchId, setSearchId] = useState(null);

  const handleTokenChange = (event) => {
    setToken(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSearchId(token);
  };

  useEffect(() => {
    if (searchId) {
      fetchTokenById();
    }
  }, [searchId]);

  const fetchTokenById = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Harap Login Terlebih Dahulu")
        console.log("Token tidak ditemukan");
        return;
      }

      const response = await axios.get(`https://team-a-spk-internet-service-provider.vercel.app/api/v1/memberships/${searchId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.status && response.data.data) {
        setData(response.data.data);
        toast.success("Token ditemukan valid");
        console.log("Data berhasil ditemukan:", response.data.data);
      } else {
        console.error("Data tidak ditemukan");
        toast.error("Token tidak valid");
        setData(null);
      }
    } catch (error) {
      // toast.error("Terjadi kesalahan saat melakukan pencarian");
      toast.error("Token tidak valid");
      toast.error("Masukkan Token yang Benar");
      console.error("Error fetching data:", error);
    }
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

  return (
    <div className="flex flex-col w-full max-w-5xl">
      <div><Toaster /></div>
      <div className="flex w-full max-w-5xl items-center space-x-2">
        <form
          onSubmit={handleSubmit}
          className="flex w-full max-w-5xl items-center space-x-2"
        >
          <div className="flex w-full max-w-5xl items-center space-x-2">
            <Input
              type="text"
              placeholder="Masukkan token pengaduan anda"
              value={token}
              onChange={handleTokenChange}
              className=""
            />
            <Button type="submit">
              <IoMdSearch className="text-2xl" />
            </Button>
          </div>
        </form>
      </div>
      <div>
        {data && (
          <div className="mt-3">
            <div className="flex flex-col text-center items-center font-semibold text-2xl">
              <h1 className="py-5">Status Pengerjaan</h1>
            </div>
            <div className="border border-border rounded-md p-5">
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>Nomor Token</TableCell>
                    <TableCell>{data.id}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>ID Pelanggan</TableCell>
                    <TableCell>{data.userId}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Nama Pelanggan</TableCell>
                    <TableCell>{data.user.name}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Permasalahan</TableCell>
                    <TableCell>
                      {data.problem === "INSTALLATION" ? "Pemasangan WIFI" :
                        data.problem === "DAMAGE" ? "Wifi Mati" :
                          data.problem === "DEVICE_PROBLEMS" ? "Kerusakan Device" :
                            data.problem === "SPEED_INCREASE" ? "Penambahan Kecepatan" :
                              data.problem === "REPORT" ? "Wifi Lemot" : ""}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Deskripsi Permasalahan</TableCell>
                    <TableCell>{data.description}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Status Pengerjaan</TableCell>
                    <TableCell className={getStatusClassName(data.status)}>
                      {data.status === "PENDING" ? "DALAM ANTRIAN" :
                        data.status === "PROCESS" ? "SEDANG DIKERJAKAN" :
                          data.status === "FINISHED" ? "SELESAI" : ""}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckProgress;
