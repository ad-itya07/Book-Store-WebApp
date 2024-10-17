import React from "react";
import Banner from "./Banner";
import TopSellers from "./TopSellers";
import Recommended from "./Recommended";

const Home = () => {
  return (
    <>
      <Banner />
      <TopSellers />
      <Recommended />
    </>
  );
};

export default Home;
