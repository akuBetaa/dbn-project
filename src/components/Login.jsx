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
import { jwtDecode } from "jwt-decode";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginFailed, setLoginFailed] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoginFailed("");

    try {
      const response = await axios.post("https://team-a-spk-internet-service-provider.vercel.app/api/v1/auth/login", {
        email,
        password,
      });

      console.log("API Response:", response.data);

      const token = response.data._token;
      localStorage.setItem("token", token);
      console.log("Token:", token);

      redirectToDashboard();
      console.log("Hurraa!!! LOGIN BERHASIL")

    } catch (error) {
      if (error.response) {
        setLoginFailed(error.response.data.message);
        console.log("Error Response:", error.response.data.message);
      } else {
        setLoginFailed("Login Gagal, Silahkan Login Lagi");
        console.log("Login Gagal, Silahkan Login Lagi");
      }
    }
  };

  const getRoleFromToken = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      console.log("Decoded Token:", decoded);
      return { role: decoded.role, id: decoded.id };
    }
    return null;
  };

  const redirectToDashboard = () => {
    const user = getRoleFromToken();
    if (!user) return; // Tambahkan pengecekan untuk null
    console.log("User Role:", user.role);
    if (user.role === "ADMIN") {
      navigate("/admin");
    } else if (user.role === "MEMBER") {
      navigate(`/user/${user.id}`);
    }
  };

  return (
    <div className="py-4 ">
      <Toaster />
      <DialogHeader>
        <DialogTitle className="text-center">Selamat Datang Kembali!</DialogTitle>
        <DialogDescription className="text-center">
          Masukkan Email dan Password Anda.
        </DialogDescription>
      </DialogHeader>
      {/* <DialogTrigger asChild>
        <Button variant="outline">Login</Button>
      </DialogTrigger> */}
      {/* <div className="sm:max-w-[425px]"> */}
        {loginFailed && <p className="text-red-500 text-center">{loginFailed}</p>}
        {/* <div className="py-4"> */}
          <form onSubmit={handleLogin} className="grid gap-4">
            <div className="flex flex-col gap-4">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="example@gmail.com"
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
                placeholder="masukkan password"
                className="col-span-3"
              />
            </div>

            {/* <DialogFooter> */}
              <Button type="submit">Login</Button>
            {/* </DialogFooter> */}
          </form>
        </div>
      // </div>
    // </div>
  );
};

export default Login;
