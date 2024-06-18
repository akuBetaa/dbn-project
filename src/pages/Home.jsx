import React from "react";
import UserLayout from "@/components/layout/UserLayout";
import { Layout, RightContent, LeftContent } from '@/components/layout/Layout'
import ImageHome from '@/assets/provider.png'

const Home = () => {
  return (
    <UserLayout>
      <Layout>
        <LeftContent className="flex justify-center items-center">
          <p>
            <span>PT.Data Buana Nusantara,</span> memberikan layanan internet connection dengan berbagai media wireless dan fiber optic. solusi yang kreatif serta komitmen atas layanannya, kami percaya mampu memberikan jasa yang berkualitas, konsisten dan memiliki nilai tambah demi tercapainya tujuan bersama. ditunjang dengan server berteknologi tinggi akan menghasilkan layanan yang supercepat dengan suport team 24 Jam.
          </p>
        </LeftContent>
        <RightContent className="flex justify-center">
          <img src={ImageHome} alt="" />
        </RightContent>
      </Layout>
    </UserLayout>
  );
};

export default Home;
