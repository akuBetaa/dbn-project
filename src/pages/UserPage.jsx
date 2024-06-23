import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import axios from "axios";
import UserLayout from '@/components/layout/UserLayout'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import toast, { Toaster } from "react-hot-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";

const UserPage = () => {
    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [updatedData, setUpdatedData] = useState({
        locationDistance: 0,
        problem: "",
        status: "",
        description: ""
    });

    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = async () => {
        setLoading(true); // Set loading true saat sedang memuat data

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error("Token tidak ditemukan");
                return;
            }

            const response = await axios.get("https://team-a-spk-internet-service-provider.vercel.app/api/v1/memberships/", {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            console.log("API Response:", response.data);

            if (response.data.status && Array.isArray(response.data.data) && response.data.data.length > 0) {
                // Jika ada data yang ditemukan dari API
                setUser(response.data.data);
                console.log("List Data Pelanggan berhasil tampil:", response.data.data);
            } else if (response.data.data === "membership data is empty") {
                // Jika data berisi string "membership data is empty"
                console.warn("Data pelanggan kosong atau tidak ditemukan");
                setUser([]); // Atur user menjadi array kosong
            } else {
                // Jika tidak ada data yang ditemukan dari API
                console.warn("Data pelanggan kosong atau tidak ditemukan");
                setUser([]); // Atur user menjadi array kosong
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            // Tampilkan pesan kesalahan menggunakan toast atau cara lain
            toast.error("Terjadi kesalahan saat memuat data pelanggan");
        } finally {
            setLoading(false); // Set loading false setelah selesai memuat data
        }
    };



    const handleEdit = () => {
        setIsEditing(true);
        setUpdatedData({
            locationDistance: user[0]?.locationDistance || 0,
            problem: user[0]?.problem || "",
            status: user[0]?.status || "",
            description: user[0]?.description || ""
        });
    };

    const handleSave = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error("Token tidak ditemukan");
                return;
            }

            const response = await axios.put(`https://team-a-spk-internet-service-provider.vercel.app/api/v1/memberships/${user[0]?.id}`, updatedData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });

            if (response.data.status) {
                toast.success("Berhasil Memperbarui Data", {
                    style: {
                        backgroundColor: 'green',
                        color: 'white',
                    },
                    iconTheme: {
                        primary: 'white',
                        secondary: 'green',
                    },
                });
            } else {
                toast.error(response.data.message);
            }

            console.log("Yey bebrhasil!!!")
            console.log("Update berhasil:", response.data);

            // Refresh data setelah berhasil menyimpan perubahan
            fetchUser();
            setIsEditing(false);
        } catch (error) {
            console.error("Error saving changes:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleStatusChange = (e) => {
        const { value } = e.target;
        setUpdatedData((prevData) => ({
            ...prevData,
            status: value
        }));
    };

    const getStatusClassName = (status) => {
        switch (status) {
            case "PENDING":
                return "font-bold text-red-500";
            case "PROCESS":
                return "font-bold text-yellow-500";
            case "FINISHED":
                return "font-bold text-green-500";
            default:
                return "";
        }
    };

    //untuk bagian profil pelanggan
    const token = localStorage.getItem('token');
    const decodedToken = token ? jwtDecode(token) : null;
    const userProfile = decodedToken ? {
        id: decodedToken.id || "",
        name: decodedToken.name || "",
        email: decodedToken.email || "",
        phoneNumber: decodedToken.phoneNumber || "",
        address: decodedToken.address || ""
    } : {};

    return (
        <UserLayout>
            <div><Toaster /></div>
            <div className="p-10 md:px-32">
                <div className="flex flex-col font-semibold text-2xl">
                    <h1 className="py-5 md:px-8">Profil Pelanggan</h1>
                </div>
                <div className="md:px-5">
                    <Table>
                        {loading ? (
                            <TableBody>
                                <TableRow>
                                    <TableCell>ID Pelanggan</TableCell>
                                    <TableCell><Skeleton className="h-4 w-[250px]" /></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Nama Pelanggan</TableCell>
                                    <TableCell><Skeleton className="h-4 w-[250px]" /></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Email</TableCell>
                                    <TableCell><Skeleton className="h-4 w-[250px]" /></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Nomor WhatsApp</TableCell>
                                    <TableCell><Skeleton className="h-4 w-[250px]" /></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Alamat Lengkap</TableCell>
                                    <TableCell><Skeleton className="h-4 w-[250px]" /></TableCell>
                                </TableRow>
                            </TableBody>
                        ) : (
                            <TableBody>
                                <TableRow>
                                    <TableCell>ID Pelanggan</TableCell>
                                    <TableCell>{userProfile.id}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Nama Pelanggan</TableCell>
                                    <TableCell>{userProfile.name}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Email</TableCell>
                                    <TableCell>{userProfile.email}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Nomor WhatsApp</TableCell>
                                    <TableCell>{userProfile.phoneNumber}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Alamat Lengkap</TableCell>
                                    <TableCell>{userProfile.address}</TableCell>
                                </TableRow>
                            </TableBody>
                        )}
                    </Table>
                </div>

                <div className="md:px-5 mt-3 md:mt-5">
                    <div className="font-semibold text-xl flex justify-between">
                        <h1 className="py-5">Pengajuan Perbaikan</h1>
                        {!isEditing ? (
                            <Button onClick={handleEdit} className="w-[80px] bg-white border border-foreground text-foreground">Edit</Button>
                        ) : (
                            <Button onClick={handleSave} className="w-[80px] bg-white border border-foreground text-foreground">Simpan</Button>
                        )}
                    </div>
                    <Table>
                        {loading ? (
                            <TableBody>
                                <TableRow>
                                    <TableCell>Nomor Token</TableCell>
                                    <TableCell><Skeleton className="h-4 w-[250px]" /></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Tanggal Pengaduan</TableCell>
                                    <TableCell><Skeleton className="h-4 w-[250px]" /></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Permasalahan</TableCell>
                                    <TableCell><Skeleton className="h-4 w-[250px]" /></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Jarak Lokasi</TableCell>
                                    <TableCell><Skeleton className="h-4 w-[250px]" /></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Deskripsi Permasalahan</TableCell>
                                    <TableCell><Skeleton className="h-4 w-[250px]" /></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Status Penanganan</TableCell>
                                    <TableCell><Skeleton className="h-4 w-[250px]" /></TableCell>
                                </TableRow>
                            </TableBody>
                        ) : (
                            user && user.length > 0 ? ( // Perubahan bagian ini
                                user.map((data) => (
                                    <TableBody key={data.id}>
                                        <TableRow>
                                            <TableCell>Nomor Token</TableCell>
                                            <TableCell>{data.id}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Tanggal Pengaduan</TableCell>
                                            <TableCell>{data.timeOfIncident}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Permasalahan</TableCell>
                                            <TableCell>
                                                {isEditing ? (
                                                    <select
                                                        name="problem"
                                                        value={updatedData.problem}
                                                        onChange={handleChange}
                                                    >
                                                        <option value="INSTALLATION">Pemasangan WIFI</option>
                                                        <option value="DAMAGE">Wifi Mati</option>
                                                        <option value="DEVICE_PROBLEMS">Kerusakan Device</option>
                                                        <option value="SPEED_INCREASE">Penambahan Kecepatan</option>
                                                        <option value="REPORT">Wifi Lemot</option>
                                                    </select>
                                                ) : (
                                                    <div>
                                                        {data.problem === "INSTALLATION" ? "Pemasangan WIFI" :
                                                            data.problem === "DAMAGE" ? "Wifi Mati" :
                                                                data.problem === "DEVICE_PROBLEMS" ? "Kerusakan Device" :
                                                                    data.problem === "SPEED_INCREASE" ? "Penambahan Kecepatan" :
                                                                        data.problem === "REPORT" ? "Wifi Lemot" : ""}
                                                    </div>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Jarak Lokasi</TableCell>
                                            <TableCell>
                                                {!isEditing ? (
                                                    data.locationDistance
                                                ) : (
                                                    <Input
                                                        type="number"
                                                        name="locationDistance"
                                                        value={updatedData.locationDistance}
                                                        onChange={handleChange}
                                                    />
                                                )}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Deskripsi Permasalahan</TableCell>
                                            <TableCell>
                                                {!isEditing ? (
                                                    data.description
                                                ) : (
                                                    <Input
                                                        name="description"
                                                        value={updatedData.description}
                                                        onChange={handleChange}
                                                    />
                                                )}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Status Penanganan</TableCell>
                                            <TableCell className={getStatusClassName(data.status)}>
                                                {data.status === "PENDING" ? "DALAM ANTRIAN" :
                                                    data.status === "PROCESS" ? "SEDANG DIKERJAKAN" :
                                                        data.status === "FINISHED" ? "SELESAI" : ""}
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                ))
                            ) : ( // Bagian ini ditambahkan
                                <TableBody>
                                    <TableRow>
                                        <TableCell colSpan={6} className="text-center text-red-500 font-semibold">
                                            <p>
                                                Belum ada pengajuan Permasalahan,
                                            </p>
                                            <p className="py-4">
                                                Apabila ada permasalahan ajukan pada form berikut
                                            </p>
                                            <Link to="/layanan-pengaduan">
                                                <Button>Form Pengajuan Permasalahan</Button>
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            )
                        )}
                    </Table>
                </div>
            </div>
        </UserLayout>

    );
};

export default UserPage;
