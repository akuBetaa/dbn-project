import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
// import axios from 'axios';
import toast from "react-hot-toast";
import { RiDeleteBin2Line } from "react-icons/ri";

const DeleteMembers = ({ productId, productName }) => {
  const deleteProduct = async (productId) => {
    const response = await axios.delete(
      `https://individual-challenge-xek4.vercel.app/api/v1/products/${productId}`,
      {
        withCredentials: false,
      }
    );
    toast.success(response.data.message, {
      style: {
        backgroundColor: "green",
        color: "white",
      },
      iconTheme: {
        primary: "white",
        secondary: "green",
      },
    });
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">
            <RiDeleteBin2Line />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Product</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            Are you sure delete{" "}
            <span className="font-bold text-red-700 size-2">{productName}</span>{" "}
            ?
          </DialogDescription>
          <DialogFooter className="flex justify-end">
            <Button
              onClick={() => deleteProduct(productId)}
              className="bg-red-700"
            >
              <i className="fa-solid fa-check"></i> &nbsp; Delete
            </Button>
            <DialogClose>
              <Button>
                <i className="fa-solid fa-xmark"></i> &nbsp; Cancel
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DeleteMembers;
