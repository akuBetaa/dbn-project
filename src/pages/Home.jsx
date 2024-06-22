import React from "react";
import UserLayout from "@/components/layout/UserLayout";
import { Layout, RightContent, LeftContent } from '@/components/layout/Layout'
import ImageHome from '@/assets/provider.png'
import { Button } from "@/components/ui/button";


const Home = () => {
  return (
    <UserLayout>
      <Layout className="flex flex-col-reverse md:flex-row container md:px-10">
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
              FItur Unggulan Kami
            </Button>
          </div>
        </LeftContent>
        <RightContent className="md:basis-1/3 flex justify-center items-center">
          <img src={ImageHome} className="w-[70%] md:w-full" alt="" />
        </RightContent>
      </Layout>
      
      <Layout>
        sadasdf
      </Layout>
    </UserLayout>
  );
};

export default Home;
