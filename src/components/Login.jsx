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

const Login = () => {
  const [loginFailed, setLoginFailed] = useState("");

  const login = (data, callback) => {
    setTimeout(() => {
      if (data.customerID === "123456789" && data.password === "123456") {
        callback(true, "mock-token");
      } else {
        callback(false, { response: { data: "ID Pelanggan & Password tidak sesuai" } });
      }
    }, 1000);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const data = {
      customerID: e.target.customerID.value,
      password: e.target.password.value,
    };

    login(data, (status, res) => {
      if (status) {
        localStorage.setItem("token", res);
        const redirectUrl = process.env.NODE_ENV === "development"
          ? "http://localhost:5173/admin/list-pelanggan"
          : "http://localhost:5173/login";
        window.location.href = redirectUrl;
      } else {
        setLoginFailed(res.response.data);
      }
    });
  };

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
        {loginFailed && <p className="text-red-500 text-center">{loginFailed}</p>}
        <div className="py-4">
          <form onSubmit={handleLogin} className="grid gap-4">
            <div className="flex flex-col gap-4">
              <Label htmlFor="customerID">ID Pelanggan</Label>
              <Input
                id="customerID"
                type="number"
                defaultValue="123456789"
                className="col-span-3"
              />
            </div>
            <div className="flex flex-col gap-4">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                defaultValue="123456"
                className="col-span-3"
              />
            </div>
            
            <DialogFooter>
              <Button type="submit">Login</Button>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Login;
