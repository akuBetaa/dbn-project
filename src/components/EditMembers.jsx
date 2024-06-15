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
import { members } from "@/lib/data";
import '@/index.css'

const EditMembers = ({ member, onSave }) => {
  const [formData, setFormData] = useState(member);

  const handleChange = (e) => {
    const { customerID, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [customerID]: value }));
  };

  const handleSubmit = () => {
    onSave(formData);
  };

  return (
    <Dialog>
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
            <Label htmlFor="customerID">Customer ID</Label>
            <Input
              id="customerID"
              type="number"
              value={members.customerID}
              onChange={handleChange}
              className="col-span-3"
              readOnly
            />
          </div>
          <div className="flex flex-col gap-4">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={members.email}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
          <div className="flex flex-col gap-4">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              type="text"
              value={members.fullName}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
          <div className="flex flex-col gap-4">
            <Label htmlFor="whatsappNumber">WhatsApp Number</Label>
            <Input
              id="whatsappNumber"
              type="text"
              value={members.whatsappNumber}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
          <div className="flex flex-col gap-4">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              type="text"
              value={members.address}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
          <div className="flex flex-col gap-4">
            <Label htmlFor="role">Role</Label>
            <Input
              id="role"
              type="text"
              value={members.role}
              onChange={handleChange}
              className="col-span-3"
            />
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