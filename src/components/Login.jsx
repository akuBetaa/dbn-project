import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import axios from "axios";

const Login = () => {
  const [ email, setEmail ] = useState ("");
  const [ password, setPassword ] = useState("");
  const [ loginFailed, setLoginFailed] = useState ("");
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoginFailed("");

    try {
      const response = await axios.post("https://team-a-spk-internet-service-provider.vercel.app/api/v1/auth/login", {
        email,
        password,
      });
      if (response.data.message) {
        setLoginFailed(response.data.message);
        console.log("Yey Login Berhasil!!!");
        navigate("/admin");
      }
    } catch (error) {
      if (error.response){
        setLoginFailed(error.response.data.message || "Login Gagal, Silahkan Login Lagi");
      } else {
        setLoginFailed("Login Gagal, Silahkan Login Lagi");
      }
    }
  }

   return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Login</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center">Selamat Datang Kembali!</DialogTitle>
          <DialogDescription className="text-center">
            Masukkan Email dan Password Anda.
          </DialogDescription>
        </DialogHeader>
        {loginFailed && <p className="text-red-500 text-center">{loginFailed}</p>}
        <div className="py-4">
          <form onSubmit={handleLogin} className="grid gap-4">
            <div className="flex flex-col gap-4">
              <Label htmlFor="customerID">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder = "example@gmail.com"
                className="col-span-3"
              />
            </div>
            <div className="flex flex-col gap-4">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder = "masukkan password"
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
