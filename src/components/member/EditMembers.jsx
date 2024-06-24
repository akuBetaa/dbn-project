import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaRegEdit } from "react-icons/fa";
import axios from 'axios';
import toast, { Toaster } from "react-hot-toast";
import '@/index.css';

const EditMembers = ({ member, onSave }) => {
  const [formData, setFormData] = useState({
    locationDistance: member.locationDistance,
    problem: member.problem,
    description: member.description,
    cost : member.cost,
    status: member.user.status,
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error("Token tidak ditemukan");
        return;
      }

      // Only include the necessary fields
      const updateData = {
        locationDistance: formData.locationDistance,
        problem: formData.problem,
        description: formData.description,
        status: formData.status,
        cost : formData.cost,
        timeOfIncident: new Date().toISOString(), // or the correct value
      };

      // Log payload for debugging
      console.log("Payload being sent:", updateData);

      const response = await axios.put(`https://team-a-spk-internet-service-provider.vercel.app/api/v1/memberships/${member.id}`, updateData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.status) {
        toast.success("Data berhasil diubah", {
          style: {
            backgroundColor: 'green',
            color: 'white',
          },
          iconTheme: {
            primary: 'white',
            secondary: 'green',
          },
        });
        console.log("Yey Berhasil mengubah data")
        onSave(response.data.data);
      } else {
        toast.error(response.data.message);
        console.log("Eror bestieee" + response.data.message)
      }
    } catch (error) {
      toast.error(error.response ? error.response.data.message : "Terjadi kesalahan saat mengubah data");
    }
  };

  return (
    <Dialog>
      <Toaster />
      <DialogTrigger asChild>
        <Button variant="outline">
          <FaRegEdit />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">Edit Data Pelanggan</DialogTitle>
          <DialogDescription className="text-center">
            Update the member information below.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-5 px-1 overflow-y-scroll h-80 hide-scrollbar">
          <div className="flex flex-col gap-4">
            <Label htmlFor="id">ID Pelanggan</Label>
            <Input
              id="id"
              type="text"
              value={member.id}
              className="col-span-3"
              readOnly
            />
          </div>
          <div className="flex flex-col gap-4">
            <Label htmlFor="name">Nama Pelanggan</Label>
            <Input
              id="name"
              type="text"
              value={member.user.name}
              className="col-span-3"
              readOnly
            />
          </div>
          <div className="flex flex-col gap-4">
            <Label htmlFor="locationDistance">Jarak (km)</Label>
            <Input
              id="locationDistance"
              type="text"
              value={formData.locationDistance}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
          <div className="flex flex-col gap-4">
            <Label htmlFor="problem">Permasalahan</Label>
            <select
              id="problem"
              value={formData.problem}
              onChange={handleChange}
              className="col-span-3 p-2 border rounded"
            >
              <option value="INSTALLATION">Pemasangan WIFI</option>
              <option value="DAMAGE">Wifi Mati</option>
              <option value="DEVICE_PROBLEMS">Kerusakan Device</option>
              <option value="SPEED_INCREASE">Penambahan Kecepatan</option>
              <option value="REPORT">Wifi Lemot</option>
            </select>
          </div>
          <div className="flex flex-col gap-4">
            <Label htmlFor="cost">Biaya Bulanan</Label>
            <Input
              id="cost"
              type="number"
              value={formData.cost}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
          <div className="flex flex-col gap-4">
            <Label htmlFor="description">Deskripsi</Label>
            <Input
              id="description"
              type="text"
              value={formData.description}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
          <div className="flex flex-col gap-4">
            <Label htmlFor="status">Status</Label>
            <select
              id="status"
              value={formData.status}
              onChange={handleChange}
              className="col-span-3 p-2 border rounded"
            >
              <option value="PENDING">Dalam Antrian</option>
              <option value="PROCESS">Sedang Dikerjakan</option>
              <option value="FINISHED">Selesai</option>
            </select>
          </div>
        </div>
        <DialogFooter className="px-1 flex md:flex-col-reverse md:space-x-2">
          <Button onClick={handleSubmit}>Simpan</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditMembers;
