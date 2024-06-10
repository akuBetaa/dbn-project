import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
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
import { toast } from "@/components/ui/use-toast";

// Schema untuk valiudasi
const FormSchema = z.object({
  customerId: z.string().min(1, {
    message: "ID Pelanggan is required.",
  }),
  fullName: z.string().min(2, {
    message: "Nama Lengkap wajib diisi.",
  }),
  whatsappNumber: z.string().min(10, {
    message: "Isi nomor telepon dengan benar.",
  }),
  problem: z.string().min(0, {
    message: "Permasalahan wajib diisi.",
  }),
  address: z.string().min(5, {
    message: "Alamat wajib diisi.",
  }),
  description: z.string().min(0, {
    message: "",
  }),
});



// Main
const FormComplaint = () => {
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      customerId: "",
      fullName: "",
      whatsappNumber: "",
      address: "",
      description: "",
    },
  });

  // Function to handle form submission
  function onSubmit(data) {
    console.log("Form submitted with data:", data);
    toast({
      title: "Success!",
      description: (
        <p className="w-[340px] rounded-md text-white">
          Data Berhasil di Input!
        </p>
      ),
      style: { backgroundColor: "green", color: "white" },
    });
  }

  // Function to handle form errors
  function onError(errors) {
    console.log("Form errors:", errors);
    toast({
      title: "Error!",
      description: (
        <p className="w-[340px] rounded-md text-white">
          Pastikan isianmu benar
        </p>
      ),
      style: { backgroundColor: "red", color: "white" },
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, onError)}
        className="w-2/3 space-y-6"
      >
        <FormField
          control={form.control}
          name="customerId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ID Pelanggan</FormLabel>
              <FormControl>
                <Input placeholder="Masukkan ID" type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama Lengkap</FormLabel>
              <FormControl>
                <Input placeholder="Masukkan nama lengkap" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="whatsappNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nomor Whatsapp</FormLabel>
              <FormControl>
                <Input type="number" placeholder="+62" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Alamat Lengkap</FormLabel>
              {/* <FormDescription>Contoh : Dusun Mungkung RT 001/ RW 002, </FormDescription> */}
              <FormControl>
                <Input placeholder="Masukkan alamat lengkap" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="problem"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Permasalahan</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="--pilih--" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="1">Pemasalangan Wifi</SelectItem>
                  <SelectItem value="2">Kerusakan Device</SelectItem>
                  <SelectItem value="3">Wifi Mati</SelectItem>
                  <SelectItem value="4">Penambahan Kecepatan</SelectItem>
                  <SelectItem value="5">Wifi Lemot</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Deskripsi Permasalahan</FormLabel>
              <FormControl>
                <Input
                  placeholder="Masukkan deskripsi permasalahan Anda"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default FormComplaint;
