import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IoMdSearch } from "react-icons/io";
import toast from "react-hot-toast";
import { fakeTokens } from "@/lib/data";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

const CheckProgress = () => {
  const [token, setToken] = useState("");
  const [searchResults, setSearchResults] = useState(null);

  const handleTokenChange = (event) => {
    setToken(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    try {
      const foundToken = fakeTokens.find(
        (fakeToken) => fakeToken.token === token
      );
      if (foundToken) {
        setSearchResults(foundToken);
      } else {
        toast.error("Token tidak valid");
        setSearchResults(null);
      }
    } catch (error) {
      toast.error("Terjadi kesalahan saat melakukan pencarian");
    }
  };

  return (
    <div className="flex flex-col w-full max-w-5xl">
      <div className="flex w-full max-w-5xl items-center space-x-2">
        <form
          onSubmit={handleSubmit}
          className="flex w-full max-w-5xl items-center space-x-2"
        >
          <div className="flex w-full max-w-5xl items-center space-x-2">
            <Input
              type="text"
              placeholder="Masukkan token pengaduan anda"
              value={token}
              onChange={handleTokenChange}
              className=""
            />
            <Button type="submit">
              <IoMdSearch className="text-2xl" />
            </Button>
          </div>
        </form>
      </div>
      <div>
        {searchResults && (
          <div className="mt-10 border border-border rounded-md p-5">
            <div className="flex flex-col text-center items-center font-semibold text-2xl">
              <h1 className="py-2">Status Pengerjaan</h1>
              {/* <hr className="w-2/3 center" /> */}
            </div>
            <div>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>Nomor Token</TableCell>
                    <TableCell>{searchResults.token}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>ID Pelanggan</TableCell>
                    <TableCell>{searchResults.customerID}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Nama Pelanggan</TableCell>
                    <TableCell>{searchResults.fullName}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Permasalahan</TableCell>
                    <TableCell>{searchResults.problem}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Deskripsi Permasalahan</TableCell>
                    <TableCell>{searchResults.description}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Status Pengerjaan</TableCell>
                    <TableCell>{searchResults.status}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckProgress;
