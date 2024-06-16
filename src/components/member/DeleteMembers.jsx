import { Button } from "@/components/ui/button";
import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import axios from 'axios';
import toast from "react-hot-toast";
import { RiDeleteBin2Line } from "react-icons/ri";

const DeleteMembers = ({ memberId, memberName, onDeleteSuccess }) => {
  const deleteMember = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error("Token tidak ditemukan");
        return;
      }

      console.log("Menghapus anggota dengan ID:", memberId);
      console.log("Menggunakan token:", token);

      const response = await axios.delete(`https://team-a-spk-internet-service-provider.vercel.app/api/v1/memberships/${memberId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.status) {
        toast.success(response.data.message, {
          style: {
            backgroundColor: 'green',
            color: 'white',
          },
          iconTheme: {
            primary: 'white',
            secondary: 'green',
          },
        });
        onDeleteSuccess(memberId);
      } else {
        toast.error(response.data.message);
      }

    } catch (error) {
      console.error("Error response:", error.response);
      toast.error(error.response ? error.response.data.message : "Terjadi kesalahan saat menghapus data");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <RiDeleteBin2Line />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Hapus Data Pelanggan</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Apakah Anda yakin ingin menghapus data ini <span className='font-bold text-red-700 size-2'>{memberName}</span>?
        </DialogDescription>
        <DialogFooter className="flex justify-end">
          <Button
            onClick={deleteMember}
            className="bg-red-700 text-white"
          >
            <i className="fa-solid fa-check"></i> &nbsp; Delete
          </Button>
          <DialogClose asChild>
            <Button variant="outline">
              <i className="fa-solid fa-xmark"></i> &nbsp; Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteMembers;
