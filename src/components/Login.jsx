import React from "react";
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

const Login = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Login</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center">Selamat Datang Kembali!</DialogTitle>
          <DialogDescription className="text-center">
            Masukkan ID Pelanggan dan Password Anda.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col gap-4">
            <Label htmlFor="customerID">
              ID Pelanggan
            </Label>
            <Input
              id="customerID"
              type="number"
              defaultValue="112233445566"
              className="col-span-3"
            />
          </div>
          <div className="flex flex-col gap-4">
            <Label htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              defaultValue="@peduarte"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Login</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Login;
