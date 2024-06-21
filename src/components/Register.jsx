import React, { useState } from 'react'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    DialogDescription,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog";
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const Register = () => {
    const [registerFailed, setRegisterFailed] = useState("");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phoneNumber: "",
        address: "",
        password: "",
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("https://team-a-spk-internet-service-provider.vercel.app/api/v1/auth/register", formData);
            console.log(response.data);
            toast.success("Berhasil Register, Silahkan Login!");

        } catch (error) {
            if (error.response) {
                setRegisterFailed(error.response.data.message);
                console.log("Error Response:", error.response.data.message);
                toast.error(error.response.data.message);
            } else {
                setRegisterFailed("Register Gagal, Silahkan Coba Lagi!");
                console.log("Register Gagal, Silahkan Coba Lagi!");
                toast.error("Register Gagal, Silahkan Coba Lagi!");
            }
        }
    }

    return (
        <div className="py-4 ">
            <Toaster />
            <DialogHeader>
                <DialogTitle className="text-center">Selamat Bergabung!</DialogTitle>
                <DialogDescription className="text-center">
                    Silahkan lakukan Pendaftaran.
                </DialogDescription>
            </DialogHeader>
            {registerFailed && <p className="text-red-500 text-center py-1 text-sm">{registerFailed}</p>}
            <form onSubmit={handleSubmit} className="grid gap-4 py-2">
                <div className='grid gap-4  px-1 overflow-y-scroll h-80 hide-scrollbar'>
                    <div className="flex flex-col gap-4">
                        <Label htmlFor="name">Nama Lengkap</Label>
                        <Input
                            id="name"
                            name="name"
                            type="text"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Beta Nurul Awwalin"
                            className="col-span-3"
                        />
                    </div>
                    <div className="flex flex-col gap-4">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="member@example.com"
                            className="col-span-3"
                        />
                    </div>
                    <div className="flex flex-col gap-4">
                        <Label htmlFor="phoneNumber">Nomor Whatsapp</Label>
                        <Input
                            id="phoneNumber"
                            name="phoneNumber"
                            type="tel"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            placeholder="08156200000"
                            className="col-span-3"
                        />
                    </div>
                    <div className="flex flex-col gap-4">
                        <Label htmlFor="address">Alamat Lengkap</Label>
                        <Input
                            id="address"
                            name="address"
                            type="text"
                            value={formData.address}
                            onChange={handleChange}
                            placeholder="Dsn. Mungkung, Ds. Wonorejo, Talun"
                            className="col-span-3"
                        />
                    </div>
                    <div className="flex flex-col gap-4">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="masukkan password"
                            className="col-span-3"
                        />
                    </div>
                </div>

                <Button type="submit">Register</Button>
            </form>
        </div>
    )
}

export default Register;
