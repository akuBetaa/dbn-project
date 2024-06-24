import React from "react";
import UserLayout from "@/components/layout/UserLayout";
import { Layout, RightContent, LeftContent } from '@/components/layout/Layout'
import ImageHome from '@/assets/provider.png'
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <UserLayout>
      <Layout className="flex flex-col-reverse md:flex-row container md:px-10 md:min-h-[500px]">
        <LeftContent className="py-10 md:py-0 md:basis-2/3 flex flex-col gap-5 justify-center  text-gray-700">
          <h1 className="font-bold text-xl md:text-4xl uppercase md:leading-normal">
            Nikmati <span className="text-blue-900">#WifiTerbaik</span> Jaringan Stabil <br />
            dengan berbagai layanan <br /> internet connection
          </h1>
          <p className="md:text-lg">
            Kami hadir memberikan layanan terbaik untuk kamu
          </p>
          <div>
            <Button>
              Konsultasi Gratis
            </Button>
          </div>
        </LeftContent>
        <RightContent className="md:basis-1/3 flex justify-center items-center">
          <img src={ImageHome} className="w-[70%] md:w-full" alt="" />
        </RightContent>
      </Layout>

      <div className="container px-14 p-4 mt-10 text-center">
        <div className="bg-gray-700 rounded-xl p-8 md:px-24 text-white ">
          <h1 className="font-bold text-lg md:text-3xl uppercase md:leading-normal">Layanan Cepat Tanggap Aduan</h1>
          <p className="font-semibold text-base md:text-xl md:leading-normal py-2">Prioritas Utama Kami: Mendengar dan Menyelesaikan Masalah Anda</p>
          <p className="text-sm md:text-base">
            Kami dengan bangga menghadirkan Layanan Cepat Tanggap Aduan. Mengalami masalah dengan layanan kami? <br /> Jangan khawatir, tim ahli kami siap memberikan solusi terbaik.
          </p>

          <div className="mt-8">
            <Link to="/layanan-pengaduan">
              <Button className="bg-white text-foreground">Adukan Masalah Anda</Button>
            </Link>
          </div>
        </div>
      </div>

      {/* <Layout>
        <LeftContent>
          <h1></h1>
        </LeftContent>
      </Layout> */}
    </UserLayout>
  );
};

export default Home;
