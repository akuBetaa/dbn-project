import React, { useRef, useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
import {jwtDecode} from "jwt-decode"; // Perbaikan: Ubah 'jwtDecode' ke 'jwtDecode' yang benar.

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

// Schema untuk validasi
const FormSchema = z.object({
  problem: z.string().min(1, {
    message: "Permasalahan wajib diisi.",
  }),
  locationDistance: z.preprocess((val) => Number(val), z.number().min(1, {
    message: "Jarak lokasi wajib diisi dan harus lebih besar dari 0.",
  })),
  description: z.string().optional(),
});

// Main
const FormComplaint = () => {
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      locationDistance: 0,
      problem: "",
      description: "",
      timeOfIncident: "",
      cost: "",
      status: ""
    },
  });

  const timeOfIncidentRef = useRef("");
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const token = localStorage.getItem('token');
    return !!token;
  });

  const [userData, setUserData] = useState({
    id: "",
    email: "",
    name: "",
    phoneNumber: "",
    address: ""
  });

  useEffect(() => {
    if (isLoggedIn) {
      const token = localStorage.getItem('token');
      console.log("Token : " + token);
      
      if (token) {
        const decodedToken = jwtDecode(token);
        console.log('Decoded token:', decodedToken);
        setUserData({
          id: decodedToken.id ?? "",
          email: decodedToken.email ?? "",
          name: decodedToken.name ?? "",
          phoneNumber: decodedToken.phoneNumber ?? "",
          address: decodedToken.address ?? ""
        });
      }
    }
  }, [isLoggedIn]);

  // untuk handle submit
  async function onSubmit(data) {
    if (!isLoggedIn) {
      toast.error("Lakukan login terlebih dahulu");
      return;
    }

    console.log("Form submitted with data:", data);

    timeOfIncidentRef.current = new Date().toISOString();
    const newData = {
      locationDistance: parseInt(data.locationDistance, 10), // Pastikan konversi ke int
      problem: data.problem,
      description: data.description,
      timeOfIncident: timeOfIncidentRef.current,
      cost: 100000,
      status: "PENDING"
    };
    
    console.log("Form data to submit:", newData);
    
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        "https://team-a-spk-internet-service-provider.vercel.app/api/v1/memberships",
        newData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      console.log("API response:", response.data);
      toast.success("Data Berhasil di Input!");
      form.reset();
      navigate("/user");
    } catch (error) {
      console.log("API error:", error.response.data);
      toast.error("Terjadi kesalahan, coba lagi nanti.");
    }
  }

  // Untuk handle eror
  function onError(errors) {
    console.log("Form errors:", errors);
    toast.error("Pastikan isianmu benar");
  }

  // Event handler untuk input fields
  const handleInputClick = (e) => {
    if (!isLoggedIn) {
      e.preventDefault();
      toast.error("Lakukan login terlebih dahulu");
    }
  };

  return (
    <Form {...form}>
      <Toaster /> 
      <form
        onSubmit={form.handleSubmit(onSubmit, onError)}
        className="w-2/3 space-y-6"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Pelanggan</FormLabel>
              <FormMessage />
              <FormControl>
                <Input 
                  placeholder="Masukkan email Anda" 
                  type="text" 
                  {...field} 
                  value={userData.email || ""} 
                  onClick={handleInputClick}
                  readOnly={isLoggedIn} 
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama Lengkap</FormLabel>
              <FormMessage />
              <FormControl>
                <Input 
                  placeholder="Masukkan nama lengkap" 
                  {...field} 
                  value={userData.name || ""}
                  onClick={handleInputClick}
                  readOnly={isLoggedIn} 
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nomor Whatsapp</FormLabel>
              <FormMessage />
              <FormControl>
                <Input 
                  type="tel" 
                  placeholder="+62" 
                  {...field} 
                  value={userData.phoneNumber || ""} 
                  readOnly={isLoggedIn}
                  onClick={handleInputClick} 
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Alamat Lengkap</FormLabel>
              <FormMessage />
              <FormControl>
                <Input 
                  placeholder="Masukkan alamat lengkap" 
                  {...field} 
                  value={userData.address || ""} 
                  onClick={handleInputClick} 
                  readOnly={isLoggedIn} 
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="problem"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Permasalahan</FormLabel>
              <FormMessage />
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value || ""} 
                onClick={handleInputClick}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="--pilih--" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="INSTALLATION">Pemasalahan Wifi</SelectItem>
                  <SelectItem value="DEVICE_PROBLEMS">Kerusakan Device</SelectItem>
                  <SelectItem value="DAMAGE">Wifi Mati</SelectItem>
                  <SelectItem value="SPEED_INCREASE">Penambahan Kecepatan</SelectItem>
                  <SelectItem value="REPORT">Wifi Lemot</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="locationDistance"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Jarak Lokasi (m)</FormLabel>
              <FormMessage />
              <FormControl>
                <Input
                  placeholder="Masukkan jarak rumah dengan DBN Kamil dalam satuan m"
                  {...field}
                  value={field.value || ""} 
                  onChange={(e) => field.onChange(parseInt(e.target.value, 10))} // Konversi ke int saat input
                  onClick={handleInputClick} 
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Deskripsi Permasalahan</FormLabel>
              <FormMessage />
              <FormControl>
                <Input
                  placeholder="Masukkan deskripsi permasalahan Anda"
                  {...field}
                  value={field.value || ""} 
                  onClick={handleInputClick} 
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default FormComplaint;
